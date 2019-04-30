import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts, clearPosts } from '../../actions/postActions';

import PostItem from './PostItem';

import Spinner from '../Spinner/Spinner';

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
        posts: nextProps.posts.posts
      });
    }
  }

  componentWillUnmount() {
    this.props.clearPosts();
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
    const { loading } = this.props.posts;
    const postsFeed = posts.map((post, i) => <PostItem post={post} key={i} />);
    const emptyMsg = <h4 className="posts__empty">Sorry, no posts have found. Write your own!</h4>;
    const showMoreBtn = (
      <div>
        <button onClick={this.showMore} className="posts__show-more button--round">
          <i className="fas fa-ellipsis-h" />
          <span className="ally">show more</span>
        </button>
      </div>
    );
    const postsWrap =
      !loading && posts.length === 0 ? (
        emptyMsg
      ) : (
        <>
          <div className="posts__wrapper">{postsFeed}</div>
          {loading && <Spinner />}
          {!loading && showMoreBtn}
        </>
      );
    return postsWrap;
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
  { getPosts, clearPosts }
)(withRouter(PostsFeed));
