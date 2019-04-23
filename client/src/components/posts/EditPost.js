import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { editPost, getPostById } from '../../actions/postActions';

class EditPost extends Component {
  state = {
    header: '',
    text: '',
    error: {}
  };

  componentDidMount() {
    if (!this.props.auth.isAuth) this.props.history.push('/');
    else this.props.getPostById(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error.error === 'Post not found') {
      this.props.history.push('/error');
    } else if (nextProps.post.post) {
      this.setState({
        header: nextProps.post.post.header,
        text: nextProps.post.post.text
      });
    }

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
    const newPost = {
      header: this.state.header,
      text: this.state.text
    };
    this.props.editPost(this.props.match.params.id, newPost, this.props.history);
  };

  render() {
    const { error } = this.state;
    return (
      <div className="create">
        <div className="container">
          <h1>Edit post</h1>
          <form onSubmit={this.onSubmit}>
            <div className="form__group">
              <label>
                Header
                <input
                  type="text"
                  name="header"
                  placeholder="Enter a header"
                  value={this.state.header}
                  onChange={this.onChange}
                  maxLength="50"
                  minLength="4"
                  required
                />
                {error.header && <span className="">{error.header}</span>}
              </label>
            </div>
            <div className="form__group">
              <label>
                Text
                <textarea
                  rows="10"
                  cols="45"
                  name="text"
                  maxLength="3000"
                  minLength="10"
                  placeholder="Text here"
                  value={this.state.text}
                  onChange={this.onChange}
                  required
                />
                {error.text && <span className="">{error.text}</span>}
              </label>
            </div>
            <div className="form__group">
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

EditPost.propTypes = {
  getPostById: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  error: state.error
});

export default connect(
  mapStateToProps,
  { editPost, getPostById }
)(withRouter(EditPost));
