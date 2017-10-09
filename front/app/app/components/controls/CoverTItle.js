import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {TweenMax, Back, Expo} from 'gsap';
import {css} from 'emotion';
import {Animate, TweenGroup} from '../shared/Animate';
import {joinClasses} from '../shared/utils';

//----------------------------------------------------------------------------------------------------------------------
// Container
//----------------------------------------------------------------------------------------------------------------------

const componentStyle = css`
  overflow: hidden;
`;

export class CoverTitle extends React.PureComponent {
  static defaultProps = {
    width : 300,
    height: 300
  };

  static propTypes = {
    width : PropTypes.number,
    height: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state          = {bodyVisible: false};
    this.backgroundComp = null;
    this.bodyComp       = null;
    this.backgroundEl   = null;
    this.bodyEl         = null;
    this.bodyTitleEl    = null;
    this.bodyDefaultY   = 0;
  }

  _onCoverMouseEnter = () => {
    this._onToggleContent();
  };

  _onCoverMouseLeave = () => {
    this._onToggleContent();
  };

  _onToggleContent = () => {
    this.setState(s => ({bodyVisible: !s.bodyVisible}));
  };

  _getContainerCSS = () => {
    return css`width:${this.props.width}px; height:${this.props.height}px; `;
  };

  componentDidMount() {
    this.backgroundEl = ReactDOM.findDOMNode(this.backgroundComp); //eslint-disable-line react/no-find-dom-node
    this.bodyEl       = ReactDOM.findDOMNode(this.bodyComp); //eslint-disable-line react/no-find-dom-node

    // TODO forces the title to be the first child
    this.bodyTitleEl = this.bodyEl.firstChild;

    if (this.bodyTitleEl) {
      this.bodyDefaultY = this.props.height - this.bodyTitleEl.clientHeight;
    }

    if (!this.state.bodyVisible) {
      TweenMax.set(this.bodyEl, {y: this.bodyDefaultY});
    }
  }

  _coverIntro = ({target, callBack}) => {
    return TweenMax.from(target, 0.5, {
      scale     : 0.75,
      alpha     : 0,
      ease      : Back.easeOut,
      onComplete: callBack
    });
  };

  _showContent = () => {
    return [
      TweenMax.to(this.backgroundEl, 1, {
        scale: 1.25,
        ease : Expo.easeOut
      }),
      TweenMax.to(this.bodyEl, 0.5, {
        y   : 0,
        ease: Expo.easeOut
      })];
  };

  _hideContent = () => {
    return [
      TweenMax.to(this.backgroundEl, 1, {
        scale: 1,
        ease : Expo.easeOut
      }),
      TweenMax.to(this.bodyEl, 0.5, {
        y   : this.bodyDefaultY,
        ease: Expo.easeOut
      })];
  };

  render() {
    const {children: originalChildren, className} = this.props;

    const children = React.Children.map(originalChildren, child => {
      let props = {};
      if (child.type.name === 'CoverTitleBackground') {
        props = {
          ref: comp => {
            this.backgroundComp = comp;
          }
        };
      } else if (child.type.name === 'CoverTitleBody') {
        props = {
          ref: comp => {
            this.bodyComp = comp;
          }
        };
      }
      return React.cloneElement(child, props);
    });

    return (
      <div
        className={joinClasses(componentStyle, className)}>
        <Animate>
          <TweenGroup
            enter={this._coverIntro}
            tween={this.state.bodyVisible ? this._showContent : this._hideContent}
          >
            <div
              onMouseEnter={this._onCoverMouseEnter}
              onMouseLeave={this._onCoverMouseLeave}
              className={this._getContainerCSS()}>
              {children}
            </div>
          </TweenGroup>
        </Animate>
      </div>
    );
  }
}

const faceContainerStyle = css`
  cursor: pointer;
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export class CoverTitleBackground extends React.PureComponent {
  render() {
    const {className, children} = this.props;
    return <div
      className={joinClasses(faceContainerStyle, className)}>{children}</div>;
  }
}

const bodyStyle = css`
  background-color: rgba(255,255,255,0.5);
  text-align: left;
`;

export class CoverTitleBody extends React.PureComponent {
  render() {
    const {className, children} = this.props;
    return <div
      className={joinClasses(faceContainerStyle, bodyStyle, className)}>{children}</div>;
  }
}

const titleStyle = css`
  padding: 1rem;
`;

export const CoverTitleTitle = ({className, children}) => <div
  className={joinClasses(titleStyle, className)}>{children}</div>;

const textStyle = css`
  padding: 1rem;
`;

export const CoverTitleText = ({className, children}) => <div
  className={joinClasses(textStyle, className)}>{children}</div>;