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
      transform: rotateX(0deg) rotateY(0deg) scale3d(1,1,1);
      transition: transform 240ms ease-out;
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
      transition: background 240ms linear, transform 240ms linear;
    `;
  };

  render () {
    const {children, className} = this.props;

    return (

      <MouseOverElement render={({x, y}) => {
        let mMidX = x - (this.props.width / 2), // - left of center + right of center
            mMidY = y - (this.props.height / 2), // - left of center + right of center
            rotX  = 0,
            rotY  = 0,
            scale = '1, 1, 1';

        if (x > 0 && y > 0) {
          rotX  = -(0.5 - x / this.props.width) * this.props.extent;
          rotY  = (0.5 - y / this.props.height) * this.props.extent;
          scale = '1.1, 1.1, 1.1';
        }

        // get angle between 0-360 for the bg shine
        let angle = Math.atan2(mMidY, mMidX) * 180 / Math.PI - 90;
        if (angle < 0) {
          angle = angle + 360;
        }

        let containerStyle = {
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