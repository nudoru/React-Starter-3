import React from 'react';
import PropTypes from 'prop-types';
import TransitionGroupPlus from 'react-transition-group-plus';
import {cleanProps, getDOMElements} from './utils';

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
- support componentWillEnter in TweenController not working due to nesting

BUGS

*/

//----------------------------------------------------------------------------------------------------------------------
// PARENT
//----------------------------------------------------------------------------------------------------------------------

export class Animate extends React.PureComponent {
  render() {
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
  transitionMode: 'out-in',
  deferLeavingComponentRemoval: false
};

// Anything other than these will be sent to children
Animate.propTypes = {
  transitionMode: PropTypes.string,
  deferLeavingComponentRemoval: PropTypes.bool
};

//----------------------------------------------------------------------------------------------------------------------
// GROUP
//----------------------------------------------------------------------------------------------------------------------

export class TweenGroup extends React.PureComponent {
  constructor(props) {
    super(props);
    // Don't want these on state so a render isn't triggered
    this.didAppear = false;
    this.cachedStyles = [];
    this.tweenTargets = [];
    // staggerTo/From returns an array of tweens so support arrays by default
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
    if (this.props.__preserveStyles) {
      this.tweenTargets.forEach((c, i) => {
        c.style = this.cachedStyles[i];
      });
    }
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
      //let invalidatedTargets = [];

      this.activeTweens.forEach((tween, i) => {
        if (!document.body.contains(tween.target)) {
          // If the component is completely replaced during a render, we'll loose the reference
          console.warn(
            'Tween target was removed from DOM during update',
            tween.target
          );
          tween.invalidate();
          //invalidatedTargets.push(i);
        } else {
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
        }
      });

      // This isn't working like it should - no new tween is returned
      // invalidatedTargets.forEach(tgt => {
      //   let domEl = ReactDOM.findDOMNode(this.tweenTargets[tgt]), //eslint-disable-line react/no-find-dom-node
      //   newtween = this._callExternalTweenCreator(this.props.tween, null, domEl);
      //   console.log(domEl,newtween)
      // });
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

  _callExternalTweenCreator(func, callBack = () => {}, targets) {
    let res = func({
      target: targets || getDOMElements(this.tweenTargets),
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

    const children = React.Children.map(originalChildren, (child, idx) =>
      React.cloneElement(child, {
        key: idx,
        ref: comp => {
          this.tweenTargets[idx] = comp;
        }
      })
    );

    return React.cloneElement(component, {
      children,
      ...cleanedProps
    });
  }
}

TweenGroup.defaultProps = {
  __preserveStyles: true,
  paused: false,
  component: <div />
};

TweenGroup.propTypes = {
  __preserveStyles: PropTypes.bool, // debugging
  __tweenID: PropTypes.number, // debugging
  component: PropTypes.object,
  paused: PropTypes.bool,
  start: PropTypes.func,
  enter: PropTypes.func,
  tween: PropTypes.func,
  leave: PropTypes.func
};