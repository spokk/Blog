import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPostById, deletePostById, likePost, dislikePost } from '../../actions/postActions';

import CommentsFeed from '../comments/CommentsFeed';
import CreateComment from '../comments/CreateComment';
import SinglePostItem from './SinglePostItem';

import Spinner from '../Spinner/Spinner';

import './SinglePost.sass';

class SinglePost extends Component {
  state = {
    post: {
      name: '',
      text: '',
      avatar: '',
      likes: [],
      comments: [],
      date: '',
      header: '',
      postAuthor: ''
    },
    user: {
      id: '',
      role: 'user',
      isAuth: false
    }
  };

  componentDidMount() {
    this.props.getPostById(this.props.match.params.id);

    if (this.props.auth.isAuth) {
      const { isAuth, user } = this.props.auth;
      this.setState({
        user: { id: user.id, isAuth, role: user.role }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error.error === 'Post not found') {
      this.props.history.replace('/error');
    } else if (nextProps.posts.post) {
      const { text, avatar, likes, comments, date, header, user, name } = nextProps.posts.post;
      this.setState({
        post: { text, avatar, likes, comments, date, header, postAuthor: user, name }
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

  render() {
    const { id, isAuth, role } = this.state.user;
    const { postAuthor, comments } = this.state.post;
    const likesAmount = this.state.post.likes.length;
    const isAdmin = role === 'admin';
    const isAuthor = isAuth && id === postAuthor;
    const attitudeButtons = (
      <>
        <button className="button--round single-post__like-btn" onClick={this.onLike}>
          <i className="far fa-thumbs-up" />
          <span className="ally">Like</span>
        </button>
        <span className="single-post__likes">{likesAmount}</span>
        <button className="button--round single-post__dislike-btn" onClick={this.onDislike}>
          <i className="far fa-thumbs-down" />
          <span className="ally">Dislike</span>
        </button>
      </>
    );
    const deleteButton = (
      <button className="button--round single-post__delete-btn" onClick={this.onDelete}>
        <i className="fas fa-trash-alt" />
        <span className="ally">Delete</span>
      </button>
    );
    const editButton = (
      <Link to={`/edit/${this.props.match.params.id}`} className="button--round single-post__edit-btn">
        <i className="fas fa-pencil-alt" />
        <span className="ally">Edit</span>
      </Link>
    );
    const Post = (
      <>
        <div className="single-post">
          <SinglePostItem post={this.state.post} />
          <div className="single-post__buttons">
            {isAuth && attitudeButtons}
            {isAuthor && editButton}
            {(isAdmin || isAuthor) && deleteButton}
          </div>
        </div>
        {isAuth && <CreateComment />}
        <CommentsFeed comments={comments} id={this.props.match.params.id} />
      </>
    );

    return this.props.posts.loading ? <Spinner /> : Post;
  }
}

SinglePost.propTypes = {
  getPostById: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
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
)(withRouter(SinglePost));
