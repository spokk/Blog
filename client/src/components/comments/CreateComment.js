import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createComment } from '../../actions/postActions';

import './CreateComment.sass';

class CreateComment extends Component {
  state = {
    comment: '',
    error: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        error: nextProps.error
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const newComment = {
      text: this.state.comment
    };
    e.target.value = '';
    this.props.createComment(this.props.match.params.id, newComment);
    this.setState({
      comment: ''
    });
  };

  render() {
    const { error } = this.state;
    const isDisabled = this.state.comment.length < 10 ? 'disabled' : false;
    return (
      <div className="create-comment">
        <h3 className="create-comment__header">Create comment</h3>
        <form className="form create-comment__form" onSubmit={this.onSubmit}>
          <div className="form__group">
            <textarea
              className="create-comment__textarea"
              name="comment"
              maxLength="3000"
              minLength="10"
              placeholder="Write your comment here"
              value={this.state.comment}
              onChange={this.onChange}
              required
            />
            {error.text && <span className="create-comment__error">{error.text}</span>}
          </div>
          <div className="form__group create-comment__submit-wrapper">
            <input type="submit" className="create-comment__submit" disabled={isDisabled} value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

CreateComment.propTypes = {
  createComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(
  mapStateToProps,
  { createComment }
)(withRouter(CreateComment));
