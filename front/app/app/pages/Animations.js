import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { TweenMax, Expo, Bounce } from 'gsap';
import styled from 'styled-components';

import { Stagger, Stagger2} from '../components/controls/shared/Animate';

import Button from '../components/controls/interactive/Button';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #eee;
`;

class Animations extends React.Component {
  constructor(props) {
    super(props);
    this.state = { anim: true };
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

  render() {
    return (
      <Container>
        <Button
          ref={button => (this.buttonRef = button)}
          onMouseEnter={this._onMouseEnter}
          onMouseLeave={this._onMouseLeave}
          primary
        >
          Do something
        </Button>
        <Stagger2
          duration={2}
          staggerTween={{
            x: 500,
            yoyo: true,
            repeat: -1,
            ease: Expo.easeOut
          }}
          className="pt-5"
        >
          <h1>{this.counter}</h1>
          <h1>{this.counter}</h1>
          <h1>{this.counter}</h1>
          <Stagger
            duration={0.5}
            staggerTween={{
              x: 200,
              yoyo: true,
              repeat: -1,
              ease: Expo.easeOut
            }}
            className="pt-5"
          >
            <h6>{this.counter}</h6>
            <h6>{this.counter}</h6>
            <h6>{this.counter}</h6>
            <h6>{this.counter}</h6>
            <h6>{this.counter}</h6>
          </Stagger>
          <h1>{this.counter}</h1>
          <h1>{this.counter}</h1>
        </Stagger2>
      </Container>
    );
  }
}

Animations.defaultProps = {};
Animations.propTypes = {};

export default Animations;
