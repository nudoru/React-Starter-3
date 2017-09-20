import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { TweenMax, Expo } from 'gsap';
import {mergeDeepLeft} from 'ramda';

// Borrowed ideas
// react-gsap-enhancer https://github.com/azazdeaz/react-gsap-enhancer
// this blog post https://www.freshtilledsoil.com/whats-the-most-developer-friendly-react-animation-library/

// BUGS
// TODO paused not working

/*
 - Paused
 - default transform point to center of element
 - use r-t-g-+
 - Single element
 - start from - set initial conditions
 - appear / leave transitions
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
    //console.log('perform', this.props.paused);
    //if (!this.props.paused) {
      if (this.activeTweens.length) {
        this.activeTweens.forEach(tween => {
          let time = tween.time();
          //let paused = tween.paused();
          let reversed = tween.reversed();

          tween
            .invalidate()
            .restart(false, true)
            .time(time, true);

          if (this.props.paused) {
            console.log('PAUSING')
            tween.pause(null, true);
          }
          if (reversed) {
            tween.reverse(null, true);
          }
        });
      } else {
        // TODO add paused here
        // TODO conditional, 1 or 2+ children
        // TODO active tweens needs to always be array
        this.activeTweens = TweenMax.staggerTo(
          getDOMElements(this.tweenTargets),
          this.props.duration,
          // this.props.staggerTween,
          this._propsToTween(this.props, this.props.staggerTween),
          this.props.staggerDelay
        );

        console.log(this._propsToTween(this.props, this.props.staggerTween))
      }
    // } else {
    //   // REMOVE this
    //   if (this.activeTweens.length) {
    //     console.log('PAUSING');
    //     this.activeTweens.forEach(tween => {
    //       let time = tween.time();
    //       tween
    //         .invalidate()
    //         .restart(false, true)
    //         .time(time, true)
    //         .pause();
    //     });
    //   }
    // }
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
  delay: 0.5,
  staggerDelay: 0.25,
  parent: <div />,
  transformOrigin: '0% 0%',
  ease: Expo.easeInOut
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
  parent: PropTypes.object,
  transformOrigin: PropTypes.string,
  ease: PropTypes.object
};
