import React from 'react';
import PropTypes from 'prop-types';
import { TweenMax, Back, Expo } from 'gsap';
import { css } from 'emotion';
import { MouseOverElement } from '../shared/MouseMove';
import { joinClasses } from '../shared/utils';

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

      <MouseOverElement render={({x, y}) => {
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
          shadow = '0 10px 30px 5px rgba(0,0,0,.15)'
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

        return (<div className='threedwrapper'>
          <div
            style={containerDynamicStyle}
            className={joinClasses('threedobject', containerStyle(this.props), className)}>
            {children}
            <div style={shineDynamicStyle} className={shineContainerStyle(this.props)}
                 ref={shine => this.shineRef = shine}/>
          </div>
        </div>);

      }}/>

    );
  }
}