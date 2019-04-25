import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';

class PostsFeed extends Component {
  state = {
    posts: []
  };
  componentDidMount() {
    this.props.getPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts.posts) {
      this.setState({
        posts: nextProps.posts.posts
      });
    }
  }

  render() {
    const { posts } = this.state;
    const postFeed = posts.map((post, i) => {
      const { text, avatar, likes, comments, date, header, _id } = post;
      const defaultAvatar = 'https://bizraise.pro/wp-content/uploads/2014/09/no-avatar-300x300.png';
      return (
        <div key={i} style={{ border: '1px solid red', margin: '10px 0' }}>
          <img src={avatar.length ? avatar : defaultAvatar} width="50" alt="avatar" />
          <h2>{header}</h2>
          <p>Text: {text}</p>
          <p>Likes: {likes.length}</p>
          <p>Comments: {comments.length}</p>
          <p>Date: {date}</p>
          <Link to={`/post/${_id}`}>link</Link>
        </div>
      );
    });

    return postFeed;
  }
}

PostsFeed.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.post,
  error: state.error
});

export default connect(
  mapStateToProps,
  { getPosts }
)(withRouter(PostsFeed));
