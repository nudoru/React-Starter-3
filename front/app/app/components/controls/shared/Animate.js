import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TransitionGroupPlus from 'react-transition-group-plus';
import {NOOP, cleanProps, getDOMElements} from './utils';

/*
Wrapper for GreenSock Animations and React components. Animations persist between 
updates as long as the element isn't recreated (looking at you styled-components).

NOTES:
...

Borrowed ideas from https://github.com/azazdeaz/react-gsap-enhancer

TODO

- Fix kills tweens code duplication
- Add 'set' props to Animate container
- listen for classes added/removed and run a tween
- pause handled enter / leave tweens
- create wrapper object for each tween target so I don't get dom el's all the time


BUGS

*/

const CSS_NO_TRANSITION = {
  transition: 'none !important'
};

//----------------------------------------------------------------------------------------------------------------------
// PARENT
//----------------------------------------------------------------------------------------------------------------------

export class Animate extends React.PureComponent {
  componentDidMount() {
    const {start} = this.props;

    if (start) {
      this.startTween = start({
        target: ReactDOM.findDOMNode(this), //eslint-disable-line react/no-find-dom-node
        props : this.props
      });
    }
  }

  componentWillUnmount() {
    if (this.startTween) {
      this.startTween.kill();
      this.startTween = null;
    }
  }

  render() {
    const {
            transitionMode,
            deferLeavingComponentRemoval,
            children: originalChildren,
            start,
            ...childProps
          } = this.props;

    let {component} = this.props;

    // RTG+ performs the animations in a <span> which won't animate, so need to
    // wrap in a <div> if no other component is specified
    if (start && !component) {
      component = <div/>;
    }

    let rtg = (<TransitionGroupPlus
      transitionMode={transitionMode}
      deferLeavingComponentRemoval={deferLeavingComponentRemoval}
    >
      {originalChildren}
    </TransitionGroupPlus>);

    if (component) {
      return React.cloneElement(component, {}, rtg);
    }

    return rtg;

  }
}

// https://github.com/cheapsteak/react-transition-group-plus#usage
Animate.defaultProps = {
  transitionMode              : 'out-in',
  deferLeavingComponentRemoval: false,
  component                   : null,
  start                       : null
};

// Anything other than these will be sent to children
Animate.propTypes = {
  transitionMode              : PropTypes.string,
  deferLeavingComponentRemoval: PropTypes.bool,
  component                   : PropTypes.object,
  start                       : PropTypes.func
};

//----------------------------------------------------------------------------------------------------------------------
// GROUP
//----------------------------------------------------------------------------------------------------------------------

export class TweenGroup extends React.PureComponent {
  constructor(props) {
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
  componentDidMount() {
  }

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

  componentWillUpdate(nextProps) {
    this._restoreDomAttrs();

    // TODO ff to the end state and invalidate
    this.enterTweens.forEach(t => {
      t.seek(t.duration(), false);
      t.pause();
      t.kill();
    });

    this.enterTweens = [];

    // The tween changed
    // Need to
    // 1) invalidate here,
    // 2) update tween props then
    // 3) restart
    if (nextProps.tween !== this.props.tween || this.props.forceUpdate) {
      this.activeTweens.forEach(t => {
        t.invalidate();
      });
      this.activeTweens = [];
    }
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

    if (this.props.tween) {
      this._startTween();
    } else {
      this._killAllTweens();
    }
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

  // TODO does this need to be recursive?
  _saveDomAttrs() {
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

  _restoreDomAttrs() {
    let domEls = getDOMElements(this.tweenTargets);

    domEls.forEach((el, i) => {
      let savedAttrs = this.cachedDomAttrs[i] || {};
      Object.keys(savedAttrs).forEach(attr => {
        el.setAttribute(attr, savedAttrs[attr]);
      });
    });
  }

  _startTween() {
    if (this.props.start) {
      this._callExternalTweenCreator(this.props.start);
    }
    this._saveDomAttrs();
    this._performAnimation();
  }

  _performAnimation() {
    if (this.activeTweens.length) {
      this.activeTweens.forEach((tween, i) => {
        //if (!document.body.contains(tween.target)) {
        //  // If the component is completely replaced during a render, we'll loose the reference
        //  console.warn(
        //    'Tween target was removed from DOM during update',
        //    tween.target
        //  );
        //  tween.invalidate();
        //} else {
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
        //}
      });

    } else if (this.props.tween) {
      this.activeTweens = this._callExternalTweenCreator(this.props.tween, this.props.tweenCallback);
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
    this.enterTweens  = [];
    this.activeTweens = [];
    this.leaveTweens  = [];
  }

  _callExternalTweenCreator(func, callBack = NOOP) {
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

  render() {
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
  forceUpdate        : false,
  component          : <div/>
};

TweenGroup.propTypes = {
  __applyNoTransition: PropTypes.bool,
  __tweenID          : PropTypes.number,
  component          : PropTypes.object,
  paused             : PropTypes.bool,
  forceUpdate        : PropTypes.bool,
  start              : PropTypes.func,
  enter              : PropTypes.func,
  tween              : PropTypes.func,
  tweenCallback      : PropTypes.func,
  leave              : PropTypes.func
};


//----------------------------------------------------------------------------------------------------------------------
// TWEENED
//----------------------------------------------------------------------------------------------------------------------

export class Tweened extends React.PureComponent {

  constructor(props) {
    super(props);
    this.tween = [];
  }

  render() {
    return (
      <div>Template component</div>
    );
  }
}

Tweened.defaultProps = {};
Tweened.propTypes    = {};