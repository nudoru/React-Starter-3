import React from 'react';
import PropTypes from 'prop-types';
import {TweenMax, Back, Expo} from 'gsap';
import {css} from 'emotion';
import {MouseOverElement} from "../shared/MouseMove";
import {Animate, TweenGroup} from '../shared/Animate';
import {mergeClassNames} from '../shared/utils';

const cardIntroFlip = ({target, callBack}) => {
  return TweenMax.from(target, 0.5, {
    scale     : 0.75,
    alpha     : 0,
    ease      : Back.easeOut,
    onComplete: callBack
  });
};

export class TiltCover extends React.PureComponent {

  pctX = 0;
  pctY = 0;

  _getContainerCSS = () => {
    return css`
      position: absolute;
      overflow: hidden;
      width: 100%;
      height: 100%;
      width:${this.props.width}px; 
      height:${this.props.height}px;
    `
  };

  _cardTilt = ({target}) => {
    return TweenMax.to(target, 0.25, {
      rotationX: this.pctY,
      rotationY: this.pctX
    });
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
          this.pctX = Math.round(((midX - x) / this.props.width) * 50);
          this.pctY = Math.round(((y - midY) / this.props.height) * 50);
        }


        return (<div className='threedwrapper'>
          <Animate>
            <TweenGroup
              enter={cardIntroFlip}
              tween={this._cardTilt}
              forceUpdate
            >
              <div
                className={mergeClassNames([this._getContainerCSS(), 'wild_apple', 'threedobject'].join(' '), className)}>
                {children}
              </div>
            </TweenGroup>
          </Animate>
        </div>);

      }}/>

    );
  }
}

TiltCover.defaultProps = {
  width : 200,
  height: 200
};

TiltCover.propTypes = {
  width : PropTypes.number,
  height: PropTypes.number
};

