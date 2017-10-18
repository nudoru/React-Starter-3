import React from 'react';
import PropTypes from 'prop-types';
import { TweenMax, Back, Expo } from 'gsap';
import { css } from 'emotion';
import { MouseOverElement } from '../shared/MouseMove';
import { Animate, TweenGroup } from '../shared/Animate';
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

  pctX = 0;
  pctY = 0;

  _getObjectCSS = () => {
    return css`
      overflow: hidden;
      width: 100%;
      height: 100%;
      width:${this.props.width}px; 
      height:${this.props.height}px;
    `;
  };

  _getShineContainerStyle = () => {
    return css`
      position: absolute;
      top: 0;
      left: 0;
      width:${this.props.width}px; 
      height:${this.props.height}px;
    `;
  };

  _cardTilt = ({target}) => {
    if (this.pctX === 0 && this.pctY === 0) {
      return TweenMax.to(target, 2, {
        rotationX: this.pctY,
        rotationY: this.pctX,
        ease     : Expo.easeOut
      });
    } else {
      return [TweenMax.set(target, {
        rotationX: this.pctY,
        rotationY: this.pctX
      })];
    }
  };

  render () {
    const {children, className} = this.props;

    return (

      <MouseOverElement render={({x, y}) => {
        let midX     = this.props.width / 2,
            midY     = this.props.height / 2,
            mMidX     = x - (this.props.width / 2), // - left of center + right of center
            mMidY     = y - (this.props.height / 2); // - left of center + right of center

        if (x <= 0 && y <= 0) {
          this.pctX = 0;
          this.pctY = 0;
        } else {

          this.pctX = Math.round(((midX - x) / this.props.width) * this.props.extent);
          this.pctY = Math.round(((y - midY) / this.props.height) * this.props.extent);
        }

        // get angle between 0-360
        let arad  = Math.atan2(mMidY, mMidX); // angle between cursor and center of container in RAD
        let angle = arad * 180 / Math.PI - 90; // convert rad in degrees
        if (angle < 0) {
          angle = angle + 360;
        }

        let shineStyle = {
          background: 'linear-gradient(' + angle + 'deg, rgba(255, 255, 255, ' + y / this.props.height * 0.4 + ') 0%,rgba(255, 255, 255, 0) 80%)',
          transform : 'translateX(' + (x/this.props.width) + 'px) translateY(' + (y/this.props.height) + 'px)'
        };

        return (<div className='threedwrapper'>
          <Animate>
            <TweenGroup
              component={<span/>}
              tween={this._cardTilt}
              forceUpdate
            >
              <div
                className={joinClasses(this._getObjectCSS(), 'threedobject', className)}>
                {children}
                <div style={shineStyle} className={this._getShineContainerStyle()} ref={shine => this.shineRef = shine}/>
              </div>
            </TweenGroup>
          </Animate>
        </div>);

      }}/>

    );
  }
}