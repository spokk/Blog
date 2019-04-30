import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPostsForSlider } from '../../actions/postActions';

import SliderItem from './SliderItem';

import './Slider.sass';

class Slider extends Component {
  state = {
    slide: 0,
    posts: []
  };

  componentDidMount() {
    this.props.getPostsForSlider();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.slider.posts) {
      this.setState({
        posts: nextProps.slider.posts
      });
    }
  }

  nextProperty = () => {
    this.setState({
      slide: this.state.slide + 1
    });
  };

  prevProperty = () => {
    this.setState({
      slide: this.state.slide - 1
    });
  };

  render() {
    const { slide, posts } = this.state;
    return (
      <div className="slider">
        <button
          className="slider__button slider__button--prev"
          onClick={this.prevProperty}
          disabled={slide === 0}
        >
          <i className="far fa-caret-square-left" />
          <span className="ally">prev slide</span>
        </button>
        <button
          className="slider__button slider__button--next"
          onClick={this.nextProperty}
          disabled={slide === posts.length - 1}
        >
          <i className="far fa-caret-square-right" />
          <span className="ally">next slide</span>
        </button>

        <div className="slides">
          <div className="slides__wrapper" style={{ transform: `translateX(${slide * -100}%)` }}>
            {posts.map((post, i) => (
              <SliderItem key={i} post={post} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  getPostsForSlider: PropTypes.func.isRequired,
  slider: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  slider: state.slider
});

export default connect(
  mapStateToProps,
  { getPostsForSlider }
)(withRouter(Slider));
