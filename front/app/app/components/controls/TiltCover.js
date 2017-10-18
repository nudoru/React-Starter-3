import React from 'react';
import PropTypes from 'prop-types';
import { TweenMax, Back, Expo } from 'gsap';
import { css } from 'emotion';
import { MouseOverElement } from '../shared/MouseMove';
import { joinClasses } from '../shared/utils';

export class TiltCover extends React.PureComponent {

  static defaultProps = {
    width : 200,
    height: 200,
    extent: 50
  };

  static  propTypes = {
    width : PropTypes.number,
    height: PropTypes.number,
    extent: PropTypes.number
  };

  _getContainerStyle = () => {
    return css`
      overflow: hidden;
      width: 100%;
      height: 100%;
      width:${this.props.width}px; 
      height:${this.props.height}px;
      transition: transform 250ms ease-out, box-shadow 500ms ease-out;
    `;
  };

  _getShineContainerStyle = () => {
    return css`
      position: absolute;
      top: 0;
      left: 0;
      width:${this.props.width}px; 
      height:${this.props.height}px;
      background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 0) 80%);
      transition: background 250ms linear, transform 250ms linear;
    `;
  };

  _clamp = val => {
    if (val < 0) {
      return 0;
    }
    if (val > 1) {
      return 1;
    }
    return val;
  };

  render () {
    const {children, className} = this.props;

    return (

      <MouseOverElement render={({x, y}) => {
        let mMidX = x - (this.props.width / 2), // - left of center + right of center
            mMidY = y - (this.props.height / 2), // - left of center + right of center
            xR    = this._clamp(x / this.props.width),
            yR    = this._clamp(y / this.props.width),
            rotX  = 0,
            rotY  = 0,
            scale = '1, 1, 1',
            shadow = '0 0 0 rgba(0,0,0,0)';

        if (x > 0 && y > 0) {
          rotX  = -(0.5 - yR) * this.props.extent;
          rotY  = (0.5 - xR) * this.props.extent;
          scale = '1.05, 1.05, 1.05';
          shadow = '0 10px 30px 5px rgba(0,0,0,.15)'
        }

        let angle = Math.atan2(mMidY, mMidX) * 180 / Math.PI - 90;
        if (angle < 0) {
          angle = angle + 360;
        }

        let containerStyle = {
          boxShadow: shadow,
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${scale})`
        };

        let shineStyle = {
          background: `linear-gradient(${angle}deg, rgba(255, 255, 255, ${y / this.props.height * 0.4}) 0%,rgba(255, 255, 255, 0) 80%)`,
          transform : `translateX(${(x / this.props.width)}px) translateY(${(y / this.props.height)}px)`
        };

        return (<div className='threedwrapper'>
          <div
            style={containerStyle}
            className={joinClasses('threedobject', this._getContainerStyle(), className)}>
            {children}
            <div style={shineStyle} className={this._getShineContainerStyle()}
                 ref={shine => this.shineRef = shine}/>
          </div>
        </div>);

      }}/>

    );
  }
}