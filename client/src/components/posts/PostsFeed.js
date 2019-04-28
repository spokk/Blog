import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';

import PostItem from './PostItem';

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
    const postsFeed = posts.map((post, i) => <PostItem post={post} key={i} />);
    const postsWrap = (
      <>
        <div className="posts__wrapper">{postsFeed}</div>
        <div>
          <button onClick={this.showMore} className="posts__show-more button--round">
            <i className="fas fa-ellipsis-h" />
            <span className="ally">show more</span>
          </button>
        </div>
      </>
    );
    return posts.length > 0 ? postsWrap : <p>Empty</p>;
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
