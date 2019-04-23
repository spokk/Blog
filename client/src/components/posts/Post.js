import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPostById, deletePostById, likePost, dislikePost } from '../../actions/postActions';

import CommentsFeed from '../comments/CommentsFeed';
import CreateComment from '../comments/CreateComment';

class Post extends Component {
  state = {
    text: '',
    avatar: '',
    likes: [],
    comments: [],
    date: '',
    header: '',
    user: '',
    id: '',
    isAuth: false
  };

  componentDidMount() {
    this.props.getPostById(this.props.match.params.id);
    if (this.props.auth.isAuth) {
      this.setState({
        id: this.props.auth.user.id,
        isAuth: this.props.auth.isAuth
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error.error === 'Post not found') {
      this.props.history.push('/error');
    } else if (nextProps.posts.post) {
      this.setState({
        text: nextProps.posts.post.text,
        avatar: nextProps.posts.post.avatar,
        likes: nextProps.posts.post.likes,
        comments: nextProps.posts.post.comments,
        date: nextProps.posts.post.date,
        header: nextProps.posts.post.header,
        user: nextProps.posts.post.user
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onDelete = () => {
    this.props.deletePostById(this.props.match.params.id, this.props.history);
  };
  onLike = () => {
    this.props.likePost(this.props.match.params.id);
  };

  onDislike = () => {
    this.props.dislikePost(this.props.match.params.id);
  };

  onCommentDelete = () => {
    console.log(1);
  };

  render() {
    const { text, avatar, likes, comments, date, header, user, id, isAuth } = this.state;
    const defaultAvatar = 'https://bizraise.pro/wp-content/uploads/2014/09/no-avatar-300x300.png';
    const buttonList = isAuth ? (
      user === id ? (
        <>
          <button onClick={this.onLike}>Like</button>
          <button onClick={this.onDislike}>Dislike</button>
          <Link to={`/edit/${this.props.match.params.id}`}>Edit</Link>
          <button onClick={this.onDelete}>Delete</button>
        </>
      ) : (
        <>
          <button onClick={this.onLike}>Like</button>
          <button onClick={this.onDislike}>Dislike</button>
        </>
      )
    ) : null;
    return (
      <>
        <div style={{ border: '1px solid red', margin: '10px 0' }}>
          <img src={avatar.length ? avatar : defaultAvatar} width="50" alt="avatar" />
          <h2>{header}</h2>
          <p>Text: {text}</p>
          <p>Likes: {likes.length}</p>
          <p>Comments: {comments.length}</p>
          <p>Date: {date}</p>
          {buttonList}
        </div>
        {this.state.isAuth && <CreateComment />}
        <CommentsFeed comments={this.state.comments} id={this.props.match.params.id} />
      </>
    );
  }
}

Post.propTypes = {
  getPostById: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  deletePostById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => ({
  posts: state.post,
  auth: state.auth,
  error: state.error
});

export default connect(
  mapStateToProps,
  { getPostById, deletePostById, likePost, dislikePost }
)(withRouter(Post));
