import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { TweenMax, Expo } from 'gsap';

import styled from 'styled-components';

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
    this.state = {};
    this.animEls = [];
  }

  _onMouseEnter = e => {
    let els = this.animEls.map(child => ReactDOM.findDOMNode(child));

    console.log(React.Children.toArray(this.helloRef.children));

    if (this.anim) {
      //this.anim.play();
    } else {
      // Single element
      // this.anim = TweenMax.to(ReactDOM.findDOMNode(this.helloRef), 0.25, {
      //   x: 500,
      //   yoyo: true,
      //   repeat: -1,
      //   ease: Expo.easeOut
      // });
      // Stagger
      this.anim = TweenMax.staggerTo(
        els,
        0.5,
        {
          delay: 0.25,
          x: 500,
          yoyo: true,
          repeat: -1,
          ease: Expo.easeOut
        },
        0.75
      );
    }
  };

  _onMouseLeave = e => {
    if (this.anim) {
      console.log('anim? ', this.anim);
      //this.anim.pause();
    }
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
        <div className="pt-5" ref={hello => (this.helloRef = hello)}>
          <h1 ref={h => this.animEls.push(h)}>One</h1>
          <h2 ref={h => this.animEls.push(h)}>Two</h2>
          <h3 ref={h => this.animEls.push(h)}>Three</h3>
        </div>
      </Container>
    );
  }
}

Animations.defaultProps = {};
Animations.propTypes = {};

export default Animations;
