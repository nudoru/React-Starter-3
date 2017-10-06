import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {TweenMax, Back} from 'gsap';
import {css} from 'emotion';
import {Animate, TweenGroup} from '../shared/Animate';
import {mergeClassNames} from '../shared/utils';

const cardSetBackFace = ({target}) => {
  return TweenMax.set(target, {
    rotationY: -180
  });
};

const cardFlipToBack = ({target, callBack}) => {
  return TweenMax.to(target, 0.5, {
    rotationY : 180,
    ease      : Back.easeOut,
    onComplete: callBack
  });
};

const cardFlipToFront = ({target, callBack}) => {
  return TweenMax.to(target, 0.75, {
    rotationY : 0,
    ease      : Back.easeInOut,
    onComplete: callBack
  });
};

const cardIntroFlip = ({target, callBack}) => {
  return TweenMax.from(target, 0.5, {
    scale     : 0.75,
    alpha     : 0,
    ease      : Back.easeOut,
    onComplete: callBack
  });
};

//----------------------------------------------------------------------------------------------------------------------
// Flip container
//----------------------------------------------------------------------------------------------------------------------

export class Flip extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state      = {activeFace: 0};
    // Don't allow extra flips during the flip animation
    this.isFlipping = false;
  }

  _onToggleFace = idx => {
    if (this.isFlipping) {
      return;
    }
    this.isFlipping = true;
    let toFace      = idx === 0 ? 1 : 0;
    this.setState(s => ({activeFace: toFace}));
  };

  _onToggleComplete = () => {
    this.isFlipping = false;
  };

  _getContainerCSS = () => {
    return css`width:${this.props.width}px; height:${this.props.height}px; `
  };

  render() {
    const {children: originalChildren, className} = this.props;

    if (React.Children.count(originalChildren) !== 2) {
      console.warn('Flip requires two children. Extra children will be discarded.');
    }

    const children = React.Children.map(originalChildren, (child, idx) => {
      // Ignore more than 2 children
      if (idx > 1) {
        return null;
      }
      return React.cloneElement(child, {
        faceIndex: idx,
        flip     : () => this._onToggleFace(idx)
      });
    });

    return (
      <div className='threedwrapper'>
        <Animate>
          <TweenGroup
            enter={cardIntroFlip}
            tween={this.state.activeFace === 0 ? cardFlipToFront : cardFlipToBack}
            tweenCallback={this._onToggleComplete}
          >
            <div
              className={mergeClassNames(this._getContainerCSS(), 'threedobject', className)}>
              {children}
            </div>
          </TweenGroup>
        </Animate>
      </div>
    );
  }
}

Flip.defaultProps = {
  width : 200,
  height: 200
};

Flip.propTypes = {
  width : PropTypes.number,
  height: PropTypes.number
};

//----------------------------------------------------------------------------------------------------------------------
// Card Face, front and back
//----------------------------------------------------------------------------------------------------------------------

const CARD_FACE_CSS = css`
  position: absolute;
  overflow: hidden;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
`;

export class Face extends React.PureComponent {

  componentDidMount() {
    if (this.props.faceIndex === 1) {
      // Set the back to -180 rotation Y
      cardSetBackFace({target: ReactDOM.findDOMNode(this)}); //eslint-disable-line react/no-find-dom-node
    }
  }

  render() {
    const {children: originalChildren, className} = this.props;

    // Clone children to pass down flip Fn
    const children = React.Children.map(originalChildren, (child, idx) => {
      let props = {};

      // Only pass it down if it's not a DOM element
      if (typeof child.type === 'function') {
        props = {flip: () => this.props.flip()};
      }

      return React.cloneElement(child, props);
    });

    return (
      <div
        className={mergeClassNames(CARD_FACE_CSS, className)}>
        {children}
      </div>
    );
  }
}

Face.defaultProps = {};
Face.propTypes    = {
  faceIndex: PropTypes.number,
  flip     : PropTypes.func
};