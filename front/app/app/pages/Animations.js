import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { TweenMax, Expo } from 'gsap';
import styled from 'styled-components';

import { Stagger } from '../components/controls/shared/Animate';

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
        <Stagger
          go={this.state.anim}
          duration={0.5}
          staggerTween={{
            x: 500,
            yoyo: true,
            repeat: -1,
            ease: Expo.easeOut
          }}
          className="pt-5"
        >
          <h1>One</h1>
          <Stagger
            duration={2}
            staggerTween={{
              y: 500,
              yoyo: true,
              repeat: -1,
              ease: Expo.easeOut
            }}
          >
            <h3>Three</h3>
            <h3>Three</h3>
            <h3>Three</h3>
          </Stagger>
          <h1>One</h1>
        </Stagger>
      </Container>
    );
  }
}

Animations.defaultProps = {};
Animations.propTypes = {};

export default Animations;
