import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/postActions';

class CommentsFeed extends Component {
  state = {
    comments: [],
    isAuth: false,
    id: ''
  };
  onDelete = e => {
    const commentid = e.target.getAttribute('commentid');
    this.props.deleteComment(this.props.id, commentid);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuth) {
      this.setState({
        isAuth: nextProps.auth.isAuth,
        id: nextProps.auth.user.id
      });
    }
    if (nextProps.comments) {
      this.setState({
        comments: nextProps.comments
      });
    }
  }
  render() {
    const defaultAvatar = 'https://bizraise.pro/wp-content/uploads/2014/09/no-avatar-300x300.png';
    const comments = this.state.comments.map((comment, i) => (
      <div key={i}>
        <img src={comment.avatar.length ? comment.avatar : defaultAvatar} width="50" alt="avatar" />
        <p>Author: {comment.name}</p>
        <p>Comment: {comment.text}</p>
        <p>Date: {comment.date}</p>
        {this.state.isAuth && comment.user === this.state.id && (
          <button onClick={this.onDelete} commentid={comment._id}>
            Delete
          </button>
        )}
      </div>
    ));
    return comments;
  }
}

CommentsFeed.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(withRouter(CommentsFeed));
