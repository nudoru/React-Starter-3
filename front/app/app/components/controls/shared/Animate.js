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
 - use r-t-g-+
 - appear / leave transitions
 - better name for starting conditions than "starting"
*/

const getDOMElements = a => a.map(ReactDOM.findDOMNode); //eslint-disable-line react/no-find-dom-node

//https://reactcommunity.org/react-transition-group/
export class Animate extends React.PureComponent {
  // _onEnter = () => {
  //   console.log('enter');
  // };

  // _onEntering = () => {
  //   console.log('entering');
  // };

  // _onEntered = () => {
  //   console.log('entered');
  // };

  // _onExit = () => {
  //   console.log('exit');
  // };

  // _onExiting = () => {
  //   console.log('exiting');
  // };

  // _onExited = () => {
  //   console.log('exited');
  // };

  render() {
    // appear={true}
    // timeout={1000}
    // in={true}
    // onEnter={this._onEnter}
    // onEntering={this._onEntering}
    // onEntered={this._onEntered}
    // onExit={this._onExit}
    // onExiting={this._onExiting}
    // onExited={this._onExited}
    return (
      <TransitionGroupPlus>
        <Stagger {...this.props}>{this.props.children}</Stagger>
      </TransitionGroupPlus>
    );
  }
}

class Stagger extends React.PureComponent {
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

  componentWillUnmount() {
    this.activeTweens.forEach(t => {
      t.kill();
    });
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
    } else {
      let domEls = getDOMElements(this.tweenTargets);

      if (this.props.start) {
        console.log('start condition', this.props.start);
        TweenMax.set(domEls, this.props.start);
      }

      this.activeTweens = TweenMax.staggerTo(
        domEls,
        this.props.duration,
        this._propsToTween(this.props, this.props.staggerTween),
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
    const { children: originalChildren, parent, ...childProps } = this.props;

    // Remove props and prevent warning on DOM el
    Object.keys(Stagger.propTypes).forEach(p => {
      if (childProps.hasOwnProperty(p)) {
        delete childProps[p];
      }
    });

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
  staggerDelay: 0,
  parent: <div />,
  transformOrigin: '0% 0%',
  ease: Expo.easeInOut
};

Stagger.propTypes = {
  staggerTween: PropTypes.object,
  duration: PropTypes.number,
  staggerDelay: PropTypes.number,
  start: PropTypes.object,
  paused: PropTypes.bool,
  parent: PropTypes.object,
  transformOrigin: PropTypes.string,
  ease: PropTypes.object
};
