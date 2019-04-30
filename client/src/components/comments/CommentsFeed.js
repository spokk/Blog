import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/postActions';

import './CommentsFeed.sass';

class CommentsFeed extends Component {
  state = {
    comments: [],
    isAuth: false,
    id: ''
  };
  onDelete = e => {
    const commentid = e.currentTarget.getAttribute('commentid');
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

    const comments = this.props.comments.map((comment, i) => {
      const time = new Date(comment.date);
      const commentDate = (
        <>
          {time.toLocaleString('en-us', { month: 'short' })} {time.getDate()}, {time.getFullYear()}
        </>
      );
      return (
        <div className="comment__item" key={i}>
          <div className="comment__credentials">
            <img
              className="comment__avatar"
              src={comment.avatar.length ? comment.avatar : defaultAvatar}
              alt="avatar"
            />
            <div className="comment__author">
              <p className="comment__name">{comment.name}</p>
              <p className="comment__date">{commentDate}</p>
            </div>
          </div>
          <div className="comment__info">
            <p className="comment__comment">{comment.text}</p>
          </div>

          {this.props.auth.isAuth && comment.user === this.props.auth.user.id && (
            <button
              className="button--round comment__delete-btn"
              onClick={this.onDelete}
              commentid={comment._id}
            >
              <i className="fas fa-trash-alt" />
              <span className="ally">Delete</span>
            </button>
          )}
        </div>
      );
    });
    return (
      <div className="comments">
        <h4 className="comments__count">{comments.length} comments</h4>
        <div className="comments__feed">{comments}</div>
      </div>
    );
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
