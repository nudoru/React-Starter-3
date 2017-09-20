import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { TweenMax, Expo, Bounce } from 'gsap';
import styled from 'styled-components';

import { Animate } from '../components/controls/shared/Animate';

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
        {!this.state.stop ? this.renderTestAnimations() : null}
      </Container>
    );
  }

  renderTestAnimations() {
    return (
      <Animate
        paused={!this.state.anim}
        duration={2}
        staggerDelay={0.25}
        enter={{
          x: 100,
          alpha: 0,
          skewX: 50
        }}
        enterDuration={1}
        tween={{
          x: 500,
          alpha: 1,
          skewX: -50,
          yoyo: true,
          repeat: -1
        }}
        className="pt-5"
      >
        <h1>{this.counter}</h1>
        <h1>{this.counter}</h1>
        <h1>{this.counter}</h1>
        <h1>{this.counter}</h1>
        <h1>{this.counter}</h1>
        <h1>{this.counter}</h1>
      </Animate>
    );
  }
}

/** 



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
