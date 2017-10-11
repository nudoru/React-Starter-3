import React from 'react';
import PropTypes from 'prop-types';
import {TweenMax, Back, Expo} from 'gsap';
import {css} from 'emotion';
import {MouseOverElement} from "../shared/MouseMove";
import {Animate, TweenGroup} from '../shared/Animate';
import {joinClasses} from '../shared/utils';

//https://github.com/bersLucas/FollowCursor/blob/master/FollowCursor.js

const introTween = ({target, callBack}) => {
  return TweenMax.from(target, 0.5, {
    scale     : 0.75,
    alpha     : 0,
    ease      : Back.easeOut,
    onComplete: callBack
  });
};

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
    `
  };

  _cardTilt = ({target}) => {
    if(this.pctX===0 && this.pctY === 0) {
      return TweenMax.to(target, 2, {
        rotationX: this.pctY,
        rotationY: this.pctX,
        ease: Expo.easeOut
      });
    } else {
      return TweenMax.set(target, {
        rotationX: this.pctY,
        rotationY: this.pctX
      });
    }
  };

  render() {
    const {children, className} = this.props;

    return (

      <MouseOverElement render={({x, y}) => {
        if (x <= 0 && y <= 0) {
          this.pctX = 0;
          this.pctY = 0;
        } else {
          let midX = this.props.width / 2,
              midY = this.props.height / 2;
          this.pctX = Math.round(((x - midX) / this.props.width) * this.props.extent);
          this.pctY = Math.round(((midY - y) / this.props.height) * this.props.extent);
        }

        return (<div className='threedwrapper'>
          <Animate>
            <TweenGroup
              component={<span/>}
              enter={introTween}
              tween={this._cardTilt}
              forceUpdate
            >
              <div
                className={joinClasses(this._getObjectCSS(), 'threedobject', className)}>
                {children}
              </div>
            </TweenGroup>
          </Animate>
        </div>);

      }}/>

    );
  }
}