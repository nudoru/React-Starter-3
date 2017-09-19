import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { TweenMax, Expo } from 'gsap';

// Borrowed ideas
// react-gsap-enhancer https://github.com/azazdeaz/react-gsap-enhancer
// this blog post https://www.freshtilledsoil.com/whats-the-most-developer-friendly-react-animation-library/

// BUGS
// TODO paused not working

const getDOMElements = a => a.map(ReactDOM.findDOMNode); //eslint-disable-line react/no-find-dom-node

//https://reactcommunity.org/react-transition-group/
export class Stagger2 extends React.PureComponent {
  _onEnter = () => {
    console.log('enter');
  };

  _onEntering = () => {
    console.log('entering');
  };

  _onEntered = () => {
    console.log('entered');
  };

  _onExit = () => {
    console.log('exit');
  };

  _onExiting = () => {
    console.log('exiting');
  };

  _onExited = () => {
    console.log('exited');
  };

  render() {
    return (
      <Transition
        appear={true}
        timeout={1000}
        in={true}
        onEnter={this._onEnter}
        onEntering={this._onEntering}
        onEntered={this._onEntered}
        onExit={this._onExit}
        onExiting={this._onExiting}
        onExited={this._onExited}
      >
        <Stagger {...this.props}>{this.props.children}</Stagger>
      </Transition>
    );
  }
}

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
    if (this.activeTweens.length) {
      this.activeTweens.forEach(tween => {
        let time = tween.time();
        let paused = tween.paused() && this.props.paused;
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
        // this._propsToTween(this.props, this.props.staggerTween),
        this.props.staggerDelay
      );
    }
  }

  _propsToTween(props, tweenObj) {
    return Object.assign(tweenObj, { paused: props.paused });
  }

  render() {
    // TODO instead of doing this, use delete.propName for extra props
    const { children: originalChildren, parent, ...childProps } = this.props;

    delete childProps.paused;
    delete childProps.duration;
    delete childProps.staggerTween;
    delete childProps.inTween;
    delete childProps.outTween;
    delete childProps.onComplete;
    delete childProps.delay;
    delete childProps.staggerDelay;
    delete childProps.onExited;
    delete childProps.appear;
    delete childProps.enter;
    delete childProps.exit;

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

    return React.cloneElement(parent, {
      children,
      ...childProps
    });
  }
}

Stagger.defaultProps = {
  paused: false,
  duration: 0.5,
  delay: 0.5,
  staggerDelay: 0.25,
  parent: <div />
};

Stagger.propTypes = {
  paused: PropTypes.bool,
  duration: PropTypes.number,
  staggerTween: PropTypes.object,
  inTween: PropTypes.object,
  outTween: PropTypes.object,
  onComplete: PropTypes.object,
  delay: PropTypes.number,
  staggerDelay: PropTypes.number,
  parent: PropTypes.object
};
