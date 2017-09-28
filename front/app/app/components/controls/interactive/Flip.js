import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { TweenMax, Back } from 'gsap';
import { Animate, TweenGroup } from '../shared/Animate';
import { cleanProps, mergeClassNames } from '../shared/utils';
/*
How to
- determine which face to show by default
 */

const setBackFace = ({target}) => {
  return TweenMax.set(target, {
    rotationY: -180
  });
};

const showBackFace = ({target, callBack}) => {
  return TweenMax.to(target, 1, {
    rotationY      : 180,
    transformOrigin: '50% 50%',
    ease           : Back.easeOut,
    onComplete     : callBack
  });
};

const showFrontFace = ({target, callBack}) => {
  return TweenMax.to(target, 1, {
    rotationY      : 0,
    transformOrigin: '50% 50%',
    ease           : Back.easeOut,
    onComplete     : callBack
  });
};

export class Flip extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {activeFace: this.props.activeFace};
    this.isFlipping = false;
  }


  _onToggleFace = idx => {
    if(this.isFlipping) {
      return;
    }
    this.isFlipping = true;
    let toFace = idx === 0 ? 1 : 0;
    this.setState(s => ({activeFace: toFace}));
  };

  _onToggleComplete = () => {
    this.isFlipping = false;
  };

  render () {
    const {children: originalChildren, className, ...rest} = this.props;
    let children;

    if (React.Children.count(originalChildren) !== 2) {
      console.warn('Flip must have two children');
    }

    children = React.Children.map(originalChildren, (child, idx) => {
      return React.cloneElement(child, {
        faceIndex: idx,
        onToggle : () => this._onToggleFace(idx)
      });
    });

    return (
      <div className={mergeClassNames('flip-wrapper', className)}>
        <Animate start={this._containerStartTweenFunc}>
          <TweenGroup
            tween={this.state.activeFace === 0 ? showFrontFace : showBackFace}
            tweenCallback={this._onToggleComplete}
          >
            <div className='flip-card'>
              {children}
            </div>
          </TweenGroup>
        </Animate>
      </div>
    );
  }
}

Flip.defaultProps = {
  trigger   : 'mouseover',           // mouseover, click, card_button
  activeFace: 0                         // 0 = front, 1 = back
};
Flip.propTypes    = {
  trigger   : PropTypes.string,
  activeFace: PropTypes.number
};

export class Face extends React.PureComponent {

  componentDidMount () {
    if (this.props.faceIndex === 1) {
      setBackFace({target: ReactDOM.findDOMNode(this)}); //eslint-disable-line react/no-find-dom-node
    }
  }

  render () {
    const {children, className, faceIndex, ...rest} = this.props;
    return (
      <div
        onMouseOver={this.props.onToggle}
        className={mergeClassNames('flip-card-face', className)}>
        {children}
      </div>
    );
  }
}

Face.defaultProps = {};
Face.propTypes    = {
  faceIndex: PropTypes.number,
  onToggle : PropTypes.func
};