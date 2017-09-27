import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { TweenMax, Linear, Circ } from 'gsap';
import { range } from 'lodash';

import { Animate, TweenGroup } from '../components/controls/shared/Animate';

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


class Animations extends React.Component {
  constructor (props) {
    super(props);
    this.state = {anim: true, stop: false, counter: 5};
  }

  _onPauseClick = e => {
    this.setState(prevState => ({anim: !prevState.anim}));
  };

  _onIncrementClick = e => {
    this.setState(prevState => ({counter: ++prevState.counter}));
  };

  _onAddMoreClick = e => {
    this.setState(prevState => ({counter: (prevState.counter += 10)}));
  };

  _onDecrementClick = e => {
    this.setState(prevState => ({counter: --prevState.counter}));
  };

  _onRemoveClick = e => {
    this.setState(prevState => ({stop: true, counter: 0}));
  };

  _enterTweenFunc = ({target, props, callBack}) => {
    return TweenMax.staggerFrom(
      target,
      2,
      {
        x    : 100,
        alpha: 0
      },
      0.1,
      callBack
    );
  };

  _startTweenFunc = ({target, props, callBack}) => {
    console.log('start tween func');
    return TweenMax.set(target, {
      x: 50
    });
  };

  _tweenFunc = ({target, props, callBack}) => {
    return TweenMax.staggerTo(
      target,
      1,
      {
        x     : 500,
        yoyo  : true,
        repeat: -1,
        ease  : Circ.easeInOut
      },
      0.25
    );
  };

  _leaveTweenFunc = ({target, props, callBack}) => {
    return TweenMax.staggerTo(
      target,
      0.5,
      {
        y    : 500,
        alpha: 0
      },
      0.25,
      callBack
    );
  };

  // TODO need to explicitly return true from shouldComponentUpdate()?

  render () {
    return (
      <div className='full-window-cover glass_water'>
        <Button onClick={this._onPauseClick}>Pause</Button>
        <Button onClick={this._onIncrementClick}>Inc</Button>
        <Button onClick={this._onDecrementClick}>Dec</Button>
        <Button onClick={this._onRemoveClick}>Remove all!</Button>
        <Button onClick={this._onAddMoreClick}>Add more ...</Button>
        <Animate>
          {range(this.state.counter).map((e, i) => {
            return (
              <TweenGroup
                key={i}
                paused={!this.state.anim}
                enter={this._enterTweenFunc}
                tween={this._tweenFunc}
                leave={this._leaveTweenFunc}
              >
                <Button>{i}, {this.state.counter}</Button>
                <p style={{color: '#f00'}}>{i}, {this.state.counter}</p>
              </TweenGroup>
            );
          })}
        </Animate>
      </div>
    );
  }
}

Animations.defaultProps = {};
Animations.propTypes    = {};

export default Animations;
