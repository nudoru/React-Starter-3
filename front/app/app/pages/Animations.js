import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { TweenMax, Expo, Bounce } from 'gsap';
import styled from 'styled-components';
import { range } from 'lodash';

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
    this.state = { anim: true, stop: false, counter: 1 };
  }

  _onPauseClick = e => {
    this.setState(prevState => ({ anim: !prevState.anim }));
  };

  _onIncrementClick = e => {
    this.setState(prevState => ({ counter: ++prevState.counter }));
  };

  _onAddMoreClick = e => {
    this.setState(prevState => ({ counter: prevState.counter+=10 }));
  };

  _onDecrementClick = e => {
    this.setState(prevState => ({ counter: --prevState.counter }));
  };

  _onRemoveClick = e => {
    this.setState(prevState => ({ stop: true, counter: 0 }));
  };

  _enterTweenFunc = ({ target, props, callBack }) => {
    return TweenMax.staggerFrom(
      target,
      0.5,
      {
        x: 100,
        alpha: 0,
        skewX: 300
      },
      0.1,
      callBack
    );
  };

  _startTweenFunc = ({ target, props, callBack }) => {
    console.log('start tween func');
    return TweenMax.set(target, {
      x: 50
    });
  };

  _tweenFunc = ({ target, props, callBack }) => {
    return TweenMax.staggerTo(
      target,
      2,
      {
        x: 500,
        skewX: 0,
        skewY: 0,
        scale: 1,
        yoyo: true,
        repeat: -1
      },
      0.25
    );
  };

  _leaveTweenFunc = ({ target, props, callBack }) => {
    return TweenMax.staggerTo(
      target,
      5,
      {
        y: 500,
        alpha: 0
      },
      0.25,
      callBack
    );
  };

  render() {
    return (
      <Container>
        <Button secondary outline className="ml-2" onClick={this._onPauseClick}>
          Pause
        </Button>
        <Button
          secondary
          outline
          className="ml-2"
          onClick={this._onIncrementClick}
        >
          Inc
        </Button>
        <Button
          secondary
          outline
          className="ml-2"
          onClick={this._onDecrementClick}
        >
          Dec
        </Button>
        <Button
          secondary
          outline
          className="ml-2"
          onClick={this._onRemoveClick}
        >
          Remove all!
        </Button>
        <Button
        secondary
        outline
        className="ml-2"
        onClick={this._onAddMoreClick}
      >
        Add more ...
      </Button>
        <Animate>
          {range(this.state.counter).map((e, i) => {
            return (
              <TweenController
                key={i}
                tweenID={i}
                paused={!this.state.anim}
                enter={this._enterTweenFunc}
                tween={this._tweenFunc}
                leave={this._leaveTweenFunc}
              >
                <p>{this.state.counter}</p>
              </TweenController>
            );
          })}
        </Animate>
      </Container>
    );
  }
}

Animations.defaultProps = {};
Animations.propTypes = {};

export default Animations;
