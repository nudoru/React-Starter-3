import React from 'react';
import PropTypes from 'prop-types';
import { TweenMax, Back, Expo } from 'gsap';
import { css } from 'emotion';
import { MouseWatch } from './common/MouseWatch';
import { joinClasses } from '../../utils/componentUtils';
import {ThreeDEl, ThreeDWrapper} from './common/Atoms';

/*
This was ultimately inspired by Union's work on the Discovery Place site.

MB 10/19/17
I wanted to use my Animation component for this, but being able to change the props
of a tween mid-motion (when the mouse moves) isn't working properly yet. Using a
CSS tween is still ok!

TODO
Whole card surface is a link
Keep using the "shine" layer as a mask?
 */

const containerStyle = props => css`
    overflow: hidden;
    width: 100%;
    height: 100%;
    width:${props.width}px; 
    height:${props.height}px;
    transition: transform 250ms ease-out, box-shadow 500ms ease-out;
  `;


const shineContainerStyle = props => css`
    position: absolute;
    top: 0;
    left: 0;
    width:${props.width}px; 
    height:${props.height}px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 0) 80%);
    transition: background 250ms linear, transform 250ms linear;
  `;

export class TiltCover extends React.PureComponent {

  static defaultProps = {
    width : 200,
    height: 200,
    extent: 20
  };

  static  propTypes = {
    width : PropTypes.number,
    height: PropTypes.number,
    extent: PropTypes.number
  };

  render () {
    const {children, className} = this.props;

    return (
      <ThreeDWrapper>
      <MouseWatch render={({x, y}) => {
        let mMidX = x - (this.props.width / 2), // - left of center + right of center
            mMidY = y - (this.props.height / 2), // - left of center + right of center
            rotX  = 0,
            rotY  = 0,
            scale = '1, 1, 1',
            shadow = '0 0 0 rgba(0,0,0,0)';

        if (x > 0 && y > 0) {
          rotX  = -(0.5 - (y / this.props.width)) * this.props.extent;
          rotY  = (0.5 - (x / this.props.width)) * this.props.extent;
          scale = '1.05, 1.05, 1.05';
          shadow = '0 2px 4px rgba(0,0,0,0.05), 4px 8px 15px -7px rgba(0,0,0,0.1), 4px 8px 20px rgba(0,0,0,0.10)' // .paper-shadow-xl
        }

        let angle = Math.atan2(mMidY, mMidX) * 180 / Math.PI - 90;
        if (angle < 0) {
          angle = angle + 360;
        }

        let containerDynamicStyle = {
          boxShadow: shadow,
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${scale})`
        };

        let shineDynamicStyle = {
          background: `linear-gradient(${angle}deg, rgba(255, 255, 255, ${y / this.props.height * 0.4}) 0%,rgba(255, 255, 255, 0) 80%)`,
          transform : `translateX(${(x / this.props.width)}px) translateY(${(y / this.props.height)}px)`
        };

        return (
          <ThreeDEl
            style={containerDynamicStyle}
            className={joinClasses(containerStyle(this.props), className)}>
            {children}
            <div style={shineDynamicStyle} className={shineContainerStyle(this.props)}
                 ref={shine => this.shineRef = shine}/>
          </ThreeDEl>
        );

      }}/>
      </ThreeDWrapper>
    );
  }
}