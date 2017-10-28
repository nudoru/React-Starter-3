import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Back, TweenMax} from 'gsap';
import {css} from 'emotion';
import {Animate, TweenGroup} from '../shared/Animate';
import {joinClasses} from '../shared/utils';
import {ThreeDEl, ThreeDWrapper} from '../shared/ThreeD';

const toBackTween = ({target}) => {
  return TweenMax.to(target, 0.5, {
    rotationY: 180,
    ease     : Back.easeOut
  });
};

const toFrontTween = ({target}) => {
  return TweenMax.to(target, 0.75, {
    rotationY: 0,
    ease     : Back.easeOut
  });
};

//----------------------------------------------------------------------------------------------------------------------
// Flip container
//----------------------------------------------------------------------------------------------------------------------

export class Flip extends React.PureComponent {

  static propTypes = {
    width : PropTypes.number,
    height: PropTypes.number
  };

  static defaultProps = {
    width : 200,
    height: 200
  };

  constructor(props) {
    super(props);
    this.state = {activeFace: 0};
  }

  _onToggleFace = idx => {
    let toFace = idx === 0 ? 1 : 0;
    this.setState(s => ({activeFace: toFace}));
  };

  render() {
    const {children: originalChildren, className} = this.props;

    if (React.Children.count(originalChildren) !== 2) {
      console.warn('Flip requires two children. Extra children will be discarded.');
    }

    const children = React.Children.map(originalChildren, (child, idx) => {
      if (idx > 1) {
        return null;
      }
      return React.cloneElement(child, {
        faceIndex: idx,
        flip     : _ => this._onToggleFace(idx)
      });
    });

    return (
      <ThreeDWrapper className={className}
                     style={{
                       width : `${this.props.width}px`,
                       height: `${this.props.width}px`
                     }}
      >
        <Animate>
          <TweenGroup
            tween={this.state.activeFace === 0 ? toFrontTween : toBackTween}
          >
            <ThreeDEl
              style={{
                width : `${this.props.width}px`,
                height: `${this.props.width}px`
              }}
            >
              {children}
            </ThreeDEl>
          </TweenGroup>
        </Animate>
      </ThreeDWrapper>
    );
  }
}

//----------------------------------------------------------------------------------------------------------------------
// Card Face, front and back
//----------------------------------------------------------------------------------------------------------------------


const faceStyle = css`
  position: absolute;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
`;

export class Face extends React.PureComponent {

  static defaultProps = {};
  static propTypes    = {
    faceIndex: PropTypes.number,
    flip     : PropTypes.func
  };

  componentDidMount() {
    if (this.props.faceIndex === 1) {
      // Set the back to -180 rotation Y
      TweenMax.set(ReactDOM.findDOMNode(this), {  //eslint-disable-line react/no-find-dom-node
        rotationY: -180
      });
    }
  }

  render() {
    const {children: originalChildren, className} = this.props;

    // Clone children to pass down flip Fn
    const children = React.Children.map(originalChildren, child => {
      let props = {};

      // Only pass it down if it's not a DOM element
      if (typeof child.type === 'function') {
        props = {flip: _ => this.props.flip()};
      }

      return React.cloneElement(child, props);
    });

    return (
      <div
        className={joinClasses(className, faceStyle)}>
        {children}
      </div>
    );
  }
}