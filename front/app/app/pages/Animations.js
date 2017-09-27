import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { TweenMax, Quad, Circ } from 'gsap';
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

  _containerStartTweenFunc = ({target, props, callBack}) => {
    return TweenMax.from(target, 2, {
      alpha: 0
    });
  };

  _enterTweenFunc = ({target, props, callBack}) => {
    return TweenMax.staggerFrom(
      target,
      1,
      {
        y     : "-25",
        alpha : 0,
        ease     : Quad.easeOut
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
      1,
      {
        y        : 100,
        autoAlpha: 0,
        ease     : Quad.easeIn
      },
      0.25,
      callBack
    );
  };

  // 3D Flip https://codepen.io/GreenSock/pen/yzahJ

  render () {
    return (
      <div className='full-window-cover glass_water'>
        <div className='fixed-top text-center'
             style={{backgroundColor: '#fff'}}>
          <Button link onClick={this._onPauseClick}>Pause</Button>
          <Button link onClick={this._onIncrementClick}>Inc</Button>
          <Button link onClick={this._onDecrementClick}>Dec</Button>
          <Button link onClick={this._onRemoveClick}>Remove all!</Button>
          <Button link onClick={this._onAddMoreClick}>Add more ...</Button>
        </div>
        <div className='mt-5'>
          <Animate start={this._containerStartTweenFunc}>
            {range(this.state.counter).map((e, i) => {
              return (
                <TweenGroup
                  key={i}
                  paused={!this.state.anim}
                  enter={this._enterTweenFunc}
                  tween={this._tweenFunc}
                  leave={this._leaveTweenFunc}
                >
                  <Button primary>{i}, {this.state.counter}</Button>
                </TweenGroup>
              );
            })}
          </Animate>
        </div>
      </div>
    );
  }
}

Animations.defaultProps = {};
Animations.propTypes    = {};

export default Animations;
