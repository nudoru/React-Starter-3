import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { TweenMax, Expo, Bounce } from 'gsap';
import styled from 'styled-components';

import {
  Animate,
  TweenController
} from '../components/controls/shared/Animate';

import Button from '../components/controls/interactive/Button';

import {
  Card,
  CardBody,
  CardTitle,
  CardSubTitle,
  CardText,
  CardLink,
  CardHeader,
  CardFooter
} from '../components/controls/presentational/Card';

const Container = styled.div.attrs({ className: 'glass_water' })`
  position: absolute;
  width: 100%;
  height: 100%;
`;

class Animations extends React.Component {
  constructor(props) {
    super(props);
    this.state = { anim: true, stop: false };
    this.counter = 1;
    this.animEls = [];
  }

  _onMouseEnter = e => {
    this.counter++;
    this.setState(prevState => ({ anim: !prevState.anim }));
  };

  _onMouseLeave = e => {
    this.counter++;
    this.setState(prevState => ({ anim: !prevState.anim }));
  };

  _onStopClick = e => {
    this.setState(prevState => ({ stop: true }));
  };

  render() {
    console.log('app state', this.state);

    return (
      <Container>
        <Button
          onMouseEnter={this._onMouseEnter}
          onMouseLeave={this._onMouseLeave}
          primary
        >
          Do something
        </Button>
        <Button secondary outline className="ml-5" onClick={this._onStopClick}>
          Stop it!
        </Button>
        <Animate>
          {!this.state.stop ? this.renderTestAnimations() : null}
        </Animate>
      </Container>
    );
  }

  _enterTweenFunc = ({ target, props, callBack }) => {
    return TweenMax.staggerFrom(target, 2, {
      x: 100,
      alpha: 0,
      skewX: 300
    }, 0.25, callBack);
  }

  _startTweenFunc = ({ target, props, callBack }) => {
    console.log('start tween func');
    return TweenMax.set(target, {
      x: 50
    });
  }

  _tweenFunc = ({ target, props, callBack }) => {
    return TweenMax.staggerTo(target, 2, {
      x: 500,
      alpha: 0,
      skewX: 50,
      skewY: 0,
      scale: 1,
      yoyo: true,
      repeat: -1
    }, 0.25);
  };

  _leaveTweenFunc = ({ target, props, callBack }) => {
    return TweenMax.staggerTo(target, 5, {
      x: 100,
      alpha: 0,
      skewX: 300,
      skewY: 300
    }, 0.25, callBack);
  }

  renderTestAnimations() {
    return (
      <TweenController
        paused={!this.state.anim}
        enter={this._enterTweenFunc}
        start={this._startTweenFunc}
        tween={this._tweenFunc}
        leave={this._leaveTweenFunc}
        className="pt-5"
      >
        <h1>{this.counter}</h1>
        <h1>{this.counter}</h1>
        <h1>{this.counter}</h1>
        <h1>{this.counter}</h1>
      </TweenController>
    );
  }
}

/** 

enter={{
          x: 100,
          alpha: 0,
          skewX: 50
        }}
        enterDuration={1}

<Animate
            staggerDelay={0.1}
            tween={{
              x: 200,
              yoyo: true,
              repeat: -1
            }}
            className="pt-5"
          >
            <h6>{this.counter}</h6>
            <h6>{this.counter}</h6>
            <h6>{this.counter}</h6>
            <h6>{this.counter}</h6>
            <h6>{this.counter}</h6>
          </Animate>

*/

Animations.defaultProps = {};
Animations.propTypes = {};

export default Animations;
