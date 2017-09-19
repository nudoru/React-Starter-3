import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { TweenMax, Expo } from 'gsap';

// Borrowed ideas from react-gsap-enhancer https://github.com/azazdeaz/react-gsap-enhancer

// TODO leverage transition group
//https://github.com/aholachek/react-animation-comparison/blob/master/src/react-transition-group-example.js

const getDOMElements = a => a.map(ReactDOM.findDOMNode); //eslint-disable-line react/no-find-dom-node

export class Stagger extends React.PureComponent {
  constructor(props) {
    super(props);
    // TODO merge these into one object
    this.originalStyle = [];
    this.tweenTargets = [];
    this.activeTweens = [];
  }

  componentDidMount() {
    this._saveStyles();
    this._performAnimation();
  }

  componentWillUpdate() {
    this._restoreStyles();
  }

  componentDidUpdate() {
    this._saveStyles();
    this._performAnimation();
  }

  _saveStyles() {
    this.originalStyle = this.tweenTargets.map(c => c.style);
    this.tweenTargets.forEach(c => {
      c._gsTransform = null;
      c._gsTweenID = null;
    });
  }

  _restoreStyles() {
    this.tweenTargets.forEach((c, i) => {
      c.style = this.originalStyle[i];
    });
  }

  _performAnimation() {
    if (this.props.go) {
      if (this.activeTweens.length) {
        this.activeTweens.forEach(tween => {
          let time = tween.time();
          let paused = tween.paused();
          let reversed = tween.reversed();

          tween
            .invalidate()
            .restart(false, true)
            .time(time, true);

          if (paused) {
            tween.pause(null, true);
          }
          if (reversed) {
            tween.reverse(null, true);
          }
        });
      } else {
        this.activeTweens = TweenMax.staggerTo(
          getDOMElements(this.tweenTargets),
          this.props.duration,
          this.props.staggerTween,
          this.props.staggerDelay
        );
      }
    }
  }

  render() {
    const {
      children: originalChildren,
      parent,
      go,
      duration,
      staggerTween,
      inTween,
      outTween,
      onComplete,
      delay,
      staggerDelay,
      ...rest
    } = this.props;

    const children = React.Children.map(originalChildren, (child, idx) => {
      let comp,
        exists = this.tweenTargets[idx] !== null,
        style = exists ? this.originalStyle[idx] : null;

      comp = React.cloneElement(child, {
        key: idx,
        ref: comp => {
          this.tweenTargets[idx] = comp;
        }
      });

      return comp;
    });

    return React.cloneElement(this.props.parent, {
      children,
      ...rest
    });
  }
}

Stagger.defaultProps = {
  go: false,
  duration: 0.5,
  delay: 0.5,
  staggerDelay: 0.25,
  parent: <div />
};

Stagger.propTypes = {
  go: PropTypes.bool,
  duration: PropTypes.number,
  staggerTween: PropTypes.object,
  inTween: PropTypes.object,
  outTween: PropTypes.object,
  onComplete: PropTypes.object,
  delay: PropTypes.number,
  staggerDelay: PropTypes.number,
  parent: PropTypes.object
};
