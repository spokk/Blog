import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';

import './PostsFeed.sass';

class PostsFeed extends Component {
  state = {
    posts: [],
    page: 1
  };
  componentDidMount() {
    this.props.getPosts(this.state.page);
    this.setState({
      page: this.state.page + 1
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts.posts) {
      this.setState({
        posts: [...this.state.posts, ...nextProps.posts.posts]
      });
    }
  }

  showMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1
      }),
      this.props.getPosts(this.state.page)
    );
  };

  render() {
    const { posts } = this.state;
    const postFeed = posts.map((post, i) => {
      const { text, avatar, likes, comments, header, _id } = post;
      const defaultAvatar = 'https://bizraise.pro/wp-content/uploads/2014/09/no-avatar-300x300.png';
      return (
        <Link to={`/post/${_id}`} key={i} className="post">
          <div className="post__wrapper">
            <img src={avatar.length ? avatar : defaultAvatar} className="post__avatar" alt="avatar" />
            <div className="post__info">
              <h2 className="post__header">{header}</h2>
              <p className="post__text">{text}</p>
              <div className="post__stats">
                <span className="post__stats-item">
                  {likes.length}
                  <i className="far fa-thumbs-up" />
                </span>
                <span className="post__stats-item">
                  {comments.length}
                  <i className="far fa-comments" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      );
    });

    return (
      <>
        <div className="posts__wrapper">{postFeed}</div>
        <div>
          <button onClick={this.showMore} className="posts__show-more button--round">
            <i className="fas fa-ellipsis-h" />
            <span className="ally">show more</span>
          </button>
        </div>
      </>
    );
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
