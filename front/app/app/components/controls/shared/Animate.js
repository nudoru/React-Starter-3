import React from 'react';
import PropTypes from 'prop-types';
import TransitionGroupPlus from 'react-transition-group-plus';
import { cleanProps, getDOMElements } from './utils';

/*
Wrapper for GreenSock Animations and React components. Animations persist between 
updates as long as the element isn't recreated (looking at you styled-components).

NOTES:
- Elements with CSS transitions may interfere. Remove them if you encounter glitches or poor performance
- Elements that are completely recreated, styled-components for example, will drop animations state changes
  since the tween looses a reference to the element

Borrowed ideas from https://github.com/azazdeaz/react-gsap-enhancer

TODO

- create an individual AnimationTarget class? Just wraps it in a div?

BUGS

*/

const CSS_NO_TRANSITION = {
  transition: 'none !important'
};

//----------------------------------------------------------------------------------------------------------------------
// PARENT
//----------------------------------------------------------------------------------------------------------------------

export class Animate extends React.PureComponent {
  render () {
    const {
            transitionMode,
            deferLeavingComponentRemoval,
            children: originalChildren,
            ...childProps
          } = this.props;

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
  transitionMode              : 'out-in',
  deferLeavingComponentRemoval: false
};

// Anything other than these will be sent to children
Animate.propTypes = {
  transitionMode              : PropTypes.string,
  deferLeavingComponentRemoval: PropTypes.bool
};

//----------------------------------------------------------------------------------------------------------------------
// GROUP
//----------------------------------------------------------------------------------------------------------------------

export class TweenGroup extends React.PureComponent {
  constructor (props) {
    super(props);
    // Don't want these on state so a render isn't triggered
    this.didAppear      = false;
    this.cachedDomAttrs = [];
    this.tweenTargets   = [];
    // staggerTo/From returns an array of tweens so support arrays by default
    this.activeTweens   = [];
    this.enterTweens    = [];
    this.leaveTweens    = [];
  }

  // Don't need to do anything here, handled by willAppear, willEnter and didUpdate
  componentDidMount () {}

  _performWillEnterAnimation (cb) {
    if (this.props.enter) {
      this.enterTweens = this._callExternalTweenCreator(this.props.enter, cb);
    } else {
      cb();
    }
  }

  _performDidEnterAnimation () {
    if (this.enterTweens.length) {
      this.enterTweens.forEach(t => t.kill());
      this.enterTweens = [];
    }
    this.didAppear = true;
    this._startTween();
  }

  componentWillAppear (cb) {
    this._performWillEnterAnimation(cb);
  }

  componentDidAppear () {
    this._performDidEnterAnimation();
  }

  componentWillEnter (cb) {
    this._performWillEnterAnimation(cb);
  }

  componentDidEnter () {
    this._performDidEnterAnimation();
  }

  componentWillUpdate () {
    this._restoreDomAttrs();
  }

  componentDidUpdate () {
    if (this.enterTweens.length) {
      // Switching to tween before enter is done due to an update
      this.enterTweens.forEach(t => {
        t.seek(t.duration(), false);
        t.kill();
      });
      this.enterTweens = [];
    }
    this._startTween();
  }

  componentWillUnmount () {
    this._killAllTweens();
  }

  componentWillLeave (cb) {
    if (this.props.leave) {
      this._killAllTweens();
      this.leaveTweens = this._callExternalTweenCreator(this.props.leave, cb);
    } else {
      cb();
    }
  }

  componentDidLeave () {
    if (this.leaveTweens.length) {
      this.leaveTweens.forEach(t => t.kill());
      this.leaveTweens = [];
    }
  }

  // TODO does this need to be recursive?
  _saveDomAttrs () {
    let domEls          = getDOMElements(this.tweenTargets);
    this.cachedDomAttrs = domEls.reduce((acc, c) => {
      let attrs = {};
      Object.keys(c.attributes).forEach(idx => {
        let attr = c.attributes[idx];
        if (attr) {
          attrs[attr.name] = attr.value;
        }
      });
      acc.push(attrs);
      return acc;
    }, []);

    domEls.forEach(c => {
      c._gsTransform = null;
      c._gsTweenID   = null;
    });
  }

  _restoreDomAttrs () {
    let domEls = getDOMElements(this.tweenTargets);

    domEls.forEach((el, i) => {
      let savedAttrs = this.cachedDomAttrs[i] || {};
      Object.keys(savedAttrs).forEach(attr => {
        el.setAttribute(attr, savedAttrs[attr]);
      });
    });
  }

  _startTween () {
    if (this.props.start) {
      this._callExternalTweenCreator(this.props.start);
    }
    this._saveDomAttrs();
    this._performAnimation();
  }

  _performAnimation () {
    if (this.activeTweens.length) {

      this.activeTweens.forEach((tween, i) => {
        // TODO possibly expensive
        if (!document.body.contains(tween.target)) {
          // If the component is completely replaced during a render, we'll loose the reference
          console.warn(
            'Tween target was removed from DOM during update',
            tween.target
          );
          tween.invalidate();
        } else {
          let time     = tween.time();
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
        }
      });

    } else if (this.props.tween) {
      this.activeTweens = this._callExternalTweenCreator(this.props.tween);
    }
  }

  _killAllTweens () {
    this.enterTweens.forEach(t => {
      t.kill();
    });
    this.activeTweens.forEach(t => {
      t.kill();
    });
    this.leaveTweens.forEach(t => {
      t.kill();
    });
    this.enterTweens  = [];
    this.activeTweens = [];
    this.leaveTweens  = [];
  }

  _callExternalTweenCreator (func, callBack = () => {}) {
    let res = func({
      target  : getDOMElements(this.tweenTargets),
      props   : this.props,
      callBack: callBack
    });

    if (Array.isArray(res)) {
      return res;
    }
    return [res];
  }

  render () {
    const {children: originalChildren, component, __applyNoTransition, ...childProps} = this.props;

    let cleanedProps = cleanProps(TweenGroup.propTypes, childProps);

    const children = React.Children.map(originalChildren, (child, idx) => {
        let adjustedStyle = child.props.style || {};

        if (__applyNoTransition) {
          adjustedStyle = Object.assign(adjustedStyle, CSS_NO_TRANSITION);
        }

        return React.cloneElement(child, {
          key  : idx,
          style: adjustedStyle,
          ref  : comp => {
            this.tweenTargets[idx] = comp;
          }
        });
      }
    );

    return React.cloneElement(component, {
      children,
      ...cleanedProps
    });
  }
}

TweenGroup.defaultProps = {
  __applyNoTransition: false,
  paused             : false,
  component          : <div/>
};

TweenGroup.propTypes = {
  __applyNoTransition: PropTypes.bool,
  __tweenID          : PropTypes.number,
  component          : PropTypes.object,
  paused             : PropTypes.bool,
  start              : PropTypes.func,
  enter              : PropTypes.func,
  tween              : PropTypes.func,
  leave              : PropTypes.func
};