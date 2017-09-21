import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TransitionGroupPlus from 'react-transition-group-plus';
import { mergeDeepLeft } from 'ramda';

// Borrowed ideas
// react-gsap-enhancer https://github.com/azazdeaz/react-gsap-enhancer
// this blog post https://www.freshtilledsoil.com/whats-the-most-developer-friendly-react-animation-library/

// BUGS
// Components buttons, cards, need to wrapped in a div to work
// After several pause restart, padding shrinks

/*
- rename "tween" to steadyTween?
 - create an individual AnimationTarget class? Just wraps it in a div?
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
      children: originalChildren,
      ...childProps
    } = this.props;
    let cleanedProps = cleanProps(Animate.propTypes, childProps);

    // TODO add key to children?
    //{React.Children.count(children) ? <TweenController {...cleanedProps}>{children}</TweenController> : null}
    return (
      <TransitionGroupPlus
        transitionMode={transitionMode}
        deferLeavingComponentRemoval={deferLeavingComponentRemoval}
      >
        {originalChildren}
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

export class TweenController extends React.PureComponent {
  constructor(props) {
    super(props);
    // Don't want these on state so a render isn't triggered
    this.originalStyle = [];
    this.tweenTargets = [];
    // Tween*.stagger* returns an array of tweens so support arrays by default
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
      this.enterTweens = this._callExternalTweenCreator(
        this.props.enter,
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
    this._startTween();
  }

  //This is called at the same time as componentDidMount() for components added to an existing TransitionGroup. It will block other animations from occurring until callback is called. It will not be called on the initial render of a TransitionGroup.
  componentWillEnter(cb) {
    if (this.props.enter) {
      this.enterTweens = this._callExternalTweenCreator(
        this.props.enter,
        cb
      );
    } else {
      cb();
    }
  }

  //This is called after the callback function that was passed to componentWillEnter() is called.
  componentDidEnter() {
    if (this.enterTweens.length) {
      this.enterTweens.forEach(t => t.kill());
      this.enterTweens = [];
    }
    this._startTween();
  }

  componentWillUpdate() {
    this._restoreStyles();
  }

  componentDidUpdate() {
    this._startTween();
  }

  componentWillUnmount() {
    console.log('Will unmount');
    this.activeTweens.forEach(t => {
      t.kill();
    });
  }

  //This is called when the child has been removed from the ReactTransitionGroup. Though the child has been removed, ReactTransitionGroup will keep it in the DOM until callback is called.
  componentWillLeave(cb) {
    console.log('will leave');
    if (this.props.leave) {
      this.leaveTweens = this._callExternalTweenCreator(
        this.props.leave,
        cb
      );
    } else {
      cb();
    }
  }

  //This is called when the willLeave callback is called (at the same time as componentWillUnmount()).
  componentDidLeave() {
    console.log('did leave');
    if (this.leaveTweens.length) {
      this.leaveTweens.forEach(t => t.kill());
      this.leaveTweens = [];
    }
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
      this._callExternalTweenCreator(this.props.start);
    }
    this._saveStyles();
    this._performAnimation();
  }

  _performAnimation() {
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
      this.activeTweens = this._callExternalTweenCreator(this.props.tween);
    }
  }

  // If enter and leave don't execute the callback, it will freeze
  _callExternalTweenCreator(func, callBack = () => {}) {
    let res = func({
      target: getDOMElements(this.tweenTargets),
      props: this.props,
      callBack: callBack
    });

    if (Array.isArray(res)) {
      return res;
    }
    return [res];
  }

  render() {
    const { children: originalChildren, component, ...childProps } = this.props;

    let cleanedProps = cleanProps(TweenController.propTypes, childProps);

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

TweenController.defaultProps = {
  paused: false,
  component: <div />
};

TweenController.propTypes = {
  paused: PropTypes.bool, // pause steady state tween
  component: PropTypes.object, // by default will be wrapped in a <div/>
  start: PropTypes.func,
  enter: PropTypes.func,
  tween: PropTypes.func,
  leave: PropTypes.func
};
