import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchPosts } from '../../actions/searchActions';

import PostItem from '../posts/PostItem';

class Search extends Component {
  state = {
    response: []
  };
  componentDidMount() {
    let query = this.props.location.search.replace('?query=', '');
    this.props.searchPosts(query, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.search.search) {
      this.setState({
        response: nextProps.search.search
      });
    }
  }
  render() {
    const searchFeed = this.state.response.map((post, i) => <PostItem post={post} key={i} />);
    return this.state.response.length > 0 ? <div className="posts__wrapper">{searchFeed}</div> : <p>Empty</p>;
  }
}

Search.propTypes = {
  searchPosts: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  search: state.search
});

export default connect(
  mapStateToProps,
  { searchPosts }
)(withRouter(Search));
