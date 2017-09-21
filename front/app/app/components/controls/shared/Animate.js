import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TransitionGroupPlus from 'react-transition-group-plus';

/*
Borrowed ideas from https://github.com/azazdeaz/react-gsap-enhancer

TODO

- create an individual AnimationTarget class? Just wraps it in a div?
- support componentWillEnter in TweenController not working due to nesting

BUGS

- Components buttons, cards, need to wrapped in a div to work
- After several pause restart, padding shrinks

*/

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

export class TweenGroup extends React.PureComponent {
  constructor(props) {
    super(props);
    // Don't want these on state so a render isn't triggered
    this.didAppear = false;
    this.cachedStyles = [];
    this.tweenTargets = [];
    // Tween*.stagger* returns an array of tweens so support arrays by default
    this.activeTweens = [];
    this.enterTweens = [];
    this.leaveTweens = [];
  }

  // Don't need to do anything here, handled by willAppear, willEnter and didUpdate
  componentDidMount() {}

  _performWillEnterAnimation(cb) {
    if (this.props.enter) {
      this.enterTweens = this._callExternalTweenCreator(this.props.enter, cb);
    } else {
      cb();
    }
  }

  _performDidEnterAnimation() {
    if (this.enterTweens.length) {
      this.enterTweens.forEach(t => t.kill());
      this.enterTweens = [];
    }
    this.didAppear = true;
    this._startTween();
  }

  componentWillAppear(cb) {
    this._performWillEnterAnimation(cb);
  }

  componentDidAppear() {
    this._performDidEnterAnimation();
  }

  componentWillEnter(cb) {
    this._performWillEnterAnimation(cb);
  }
  componentDidEnter() {
    this._performDidEnterAnimation();
  }

  componentWillUpdate() {
    this._restoreStyles();
  }

  componentDidUpdate() {
    this._startTween();
  }

  componentWillUnmount() {
    this._killAllTweens();
  }

  componentWillLeave(cb) {
    if (this.props.leave) {
      this._killAllTweens();
      this.leaveTweens = this._callExternalTweenCreator(this.props.leave, cb);
    } else {
      cb();
    }
  }

  componentDidLeave() {
    if (this.leaveTweens.length) {
      this.leaveTweens.forEach(t => t.kill());
      this.leaveTweens = [];
    }
  }

  _saveStyles() {
    this.cachedStyles = this.tweenTargets.map(c => c.style);
    this.tweenTargets.forEach(c => {
      c._gsTransform = null;
      c._gsTweenID = null;
    });
  }

  _restoreStyles() {
    this.tweenTargets.forEach((c, i) => {
      c.style = this.cachedStyles[i];
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

  _killAllTweens() {
    this.enterTweens.forEach(t => {
      t.kill();
    });
    this.activeTweens.forEach(t => {
      t.kill();
    });
    this.leaveTweens.forEach(t => {
      t.kill();
    });
  }

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

    let cleanedProps = cleanProps(TweenGroup.propTypes, childProps);

    const children = React.Children.map(originalChildren, (child, idx) => {
      let comp,
        exists = this.tweenTargets[idx] !== null,
        style = exists ? this.cachedStyles[idx] : null;

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

TweenGroup.defaultProps = {
  paused: false,
  component: <div />
};

TweenGroup.propTypes = {
  tweenID: PropTypes.number,
  paused: PropTypes.bool,
  component: PropTypes.object,
  start: PropTypes.func,
  enter: PropTypes.func,
  tween: PropTypes.func,
  leave: PropTypes.func
};
