import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// import Transition from 'react-transition-group/Transition';
import TransitionGroupPlus from 'react-transition-group-plus';
import { TweenMax, Expo } from 'gsap';
import { mergeDeepLeft } from 'ramda';

//https://greensock.com/get-started-js

// Borrowed ideas
// react-gsap-enhancer https://github.com/azazdeaz/react-gsap-enhancer
// this blog post https://www.freshtilledsoil.com/whats-the-most-developer-friendly-react-animation-library/

// BUGS
// Components buttons, cards, need to wrapped in a div to work
// After several pause restart, padding shrinks

/*
  - extract code from appear and reuse for enter
 - leave transitions
 - create an individual AnimationTarget class? Just wraps it in a div?
 - Use imperative components to define enter/leave/steady tweens?
*/

// TODO MOAR functional
const cleanProps = (propTypes, childProps) => {
  Object.keys(propTypes).forEach(p => {
    if (childProps.hasOwnProperty(p)) {
      delete childProps[p];
    }
  });
  return childProps;
};

const getDOMElements = a => a.map(ReactDOM.findDOMNode); //eslint-disable-line react/no-find-dom-node

// Provides enter/leave hooks
export class Animate extends React.PureComponent {
  render() {
    const {
      transitionMode,
      deferLeavingComponentRemoval,
      children,
      ...childProps
    } = this.props;
    let cleanedProps = cleanProps(Animate.propTypes, childProps);

    // TODO add key to children?
    //{React.Children.count(children) ? <AnimationController {...cleanedProps}>{children}</AnimationController> : null}
    return (
      <TransitionGroupPlus
        transitionMode={transitionMode}
        deferLeavingComponentRemoval={deferLeavingComponentRemoval}
      >
        {children}
      </TransitionGroupPlus>
    );
  }
}

// https://github.com/cheapsteak/react-transition-group-plus#usage
Animate.defaultProps = {
  transitionMode: 'out-in',
  deferLeavingComponentRemoval: false
};

// Anything other than these will be sent to children
Animate.propTypes = {
  transitionMode: PropTypes.string,
  deferLeavingComponentRemoval: PropTypes.bool
};

export class AnimationController extends React.PureComponent {
  constructor(props) {
    super(props);
    // Don't want these on state so a render isn't triggered
    this.isEntering = false;
    this.isLeaving = false;
    this.originalStyle = [];
    this.tweenTargets = [];
    this.activeTweens = [];
    this.enterTweens = [];
    this.leaveTweens = [];
  }

  componentDidMount() {
    // Animation starts in didAppear and didEnter
    //console.log('Did mount');
  }

  // This is called at the same time as componentDidMount() for components that are initially mounted in a TransitionGroup. It will block other animations from occurring until callback is called. It is only called on the initial render of a TransitionGroup.
  componentWillAppear(cb) {
    if (this.props.enter) {
      this.isEntering = true;

      let tween = mergeDeepLeft({}, this.props.enter);

      this.enterTweens = TweenMax.staggerFrom(
        getDOMElements(this.tweenTargets),
        this.props.enterDuration,
        tween,
        this.props.enterStaggerDuration,
        cb
      );
    } else {
      cb();
    }
  }

  //This is called after the callback function that was passed to componentWillAppear is called.
  componentDidAppear() {
    if (this.enterTweens.length) {
      this.enterTweens.forEach(t => t.kill());
      this.enterTweens = [];
    }
    this.isEntering = false;

    this._startTween();
  }

  //This is called at the same time as componentDidMount() for components added to an existing TransitionGroup. It will block other animations from occurring until callback is called. It will not be called on the initial render of a TransitionGroup.
  componentWillEnter(cb) {
    console.log('will enter');
    // TODO animate 'enter' and call cb at end
    cb();
  }

  //This is called after the callback function that was passed to componentWillEnter() is called.
  componentDidEnter() {
    console.log('did enter');
    // TODO kill enter animations
    // TODO start main animation?
  }

  componentWillUpdate() {
    this._restoreStyles();
  }

  componentDidUpdate() {
    this._startTween();
  }

  componentWillUnmount() {
    console.log('Will unmount')
    this.activeTweens.forEach(t => {
      t.kill();
    });
  }

  //This is called when the child has been removed from the ReactTransitionGroup. Though the child has been removed, ReactTransitionGroup will keep it in the DOM until callback is called.
  componentWillLeave(cb) {
    console.log('will leave');
    this.isLeaving = true;
    // TODO animate 'leave' and call cb at end
    cb();
  }

  //This is called when the willLeave callback is called (at the same time as componentWillUnmount()).
  componentDidLeave() {
    console.log('did leave');
    // TODO kill leave animations
    if (this.leaveTweens.length) {
      this.leaveTweens.forEach(t => t.kill());
      this.leaveTweens = [];
    }
    this.isLeaving = false;
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

  _startTween() {
    if (this.props.start) {
      if (this.props.start && this.props.enter) {
        console.warn('Animation with starting props and enter transition!');
      }
      TweenMax.set(getDOMElements(this.tweenTargets), this.props.start);
    }
    this._saveStyles();
    this._performAnimation();
  }

  _performAnimation() {
    if (this.isEntering) {
      console.log('is entering');
      return;
    }

    if (this.activeTweens.length) {
      this.activeTweens.forEach(tween => {
        let time = tween.time();
        let reversed = tween.reversed();

        tween
          .invalidate()
          .restart(false, true)
          .time(time, true);

        if (this.props.paused) {
          tween.pause(null, true);
        }
        if (reversed) {
          tween.reverse(null, true);
        }
      });
    } else if (this.props.tween) {
      this.activeTweens = TweenMax.staggerTo(
        getDOMElements(this.tweenTargets),
        this.props.duration,
        this._propsToTween(this.props, this.props.tween),
        this.props.staggerDelay
      );
    }
  }

  // Add defaults to the tween object if they aren't specified
  _propsToTween(props, tweenObj) {
    return mergeDeepLeft(
      {
        transformOrigin: this.props.transformOrigin,
        ease: this.props.ease,
        paused: this.props.paused
      },
      tweenObj
    );
  }

  render() {
    const { children: originalChildren, component, ...childProps } = this.props;

    // Remove props and prevent warning on DOM el
    let cleanedProps = cleanProps(AnimationController.propTypes, childProps);

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

    return React.cloneElement(component, {
      children,
      ...cleanedProps
    });
  }
}

AnimationController.defaultProps = {
  paused: false,
  duration: 0.5,
  staggerDelay: 0.25,
  component: <div />,
  transformOrigin: '0% 0%',
  ease: Expo.easeInOut,
  enterDuration: 0.5,
  leaveDuration: 0.5,
  enterStaggerDuration: 0.25,
  leaveStaggerDuration: 0.25
};

AnimationController.propTypes = {
  start: PropTypes.object,               // Starting properties
  tween: PropTypes.object,               // Steady state tween
  enter: PropTypes.object,               // enter / appear tween
  leave: PropTypes.object,               // leave / unmount tween
  duration: PropTypes.number,            // duration of steady tween
  staggerDelay: PropTypes.number,        // for multiple children, delay between children
  enterStaggerDuration: PropTypes.number,
  enterDuration: PropTypes.number,
  leaveStaggerDuration: PropTypes.number,
  leaveDuration: PropTypes.number,
  paused: PropTypes.bool,                // pause steady state tween
  component: PropTypes.object,           // by default will be wrapped in a <div/>
  transformOrigin: PropTypes.string,     // origin point, default top left
  ease: PropTypes.object                 // steady state default easing function
};
