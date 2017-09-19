import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { TweenMax, Expo } from 'gsap';
import styled from 'styled-components';

import { Animate } from '../components/controls/shared/Animate';

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
    this.animEls = [];
  }

  _onMouseEnter = e => {
    this.setState(prevState => ({ anim: !prevState.anim }));
  };

  _onMouseLeave = e => {
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
          Move it!
        </Button>
        <Animate
          go={this.state.anim}
          staggerTween={({
            x: 500,
            yoyo: true,
            repeat: -1,
            ease: Expo.easeOut
          })}
          className="pt-5"
        >
          <h1>One</h1>
          <h2>Two</h2>
          <h3>Three</h3>
        </Animate>
      </Container>
    );
  }
}

Animations.defaultProps = {};
Animations.propTypes = {};

export default Animations;
