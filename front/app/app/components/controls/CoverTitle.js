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
  position: relative;
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

  componentDidMount() {
    this.backgroundEl = ReactDOM.findDOMNode(this.backgroundComp); //eslint-disable-line react/no-find-dom-node
    this.bodyEl       = ReactDOM.findDOMNode(this.bodyComp); //eslint-disable-line react/no-find-dom-node

    console.log('body comp', this.bodyComp);
    console.log('body el?', this.bodyEl);

    // TODO forces the title to be the first child
    this.bodyTitleEl = this.bodyEl.firstChild;

    if (this.bodyTitleEl) {
      this.bodyDefaultY = this.props.height - this.bodyTitleEl.clientHeight;
    }

    if (!this.state.bodyVisible) {
      TweenMax.set(this.bodyEl, {y: this.bodyDefaultY});
    }
  }

  _componentIntroTween = ({target, callBack}) => {
    return TweenMax.from(target, 0, {
      scale     : 0.9,
      alpha     : 1,
      ease      : Back.easeOut,
      onComplete: callBack
    });
  };

  _showContentTween = () => {
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

  _hideContentTween = () => {
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

  _getContainerCSS = () => {
    return css`
    position: relative;
    overflow: hidden;
    width:${this.props.width}px; 
    height:${this.props.height}px;
    `;
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
        className={joinClasses(componentStyle, this._getContainerCSS(), className)}>
        <Animate>
          <TweenGroup
            tween={this.state.bodyVisible ? this._showContentTween : this._hideContentTween}
            immediate={false}>
            <div
              onMouseOver={this._onCoverMouseEnter}
              onMouseOut={this._onCoverMouseLeave}>
              {children}
            </div>
          </TweenGroup>
        </Animate>
      </div>
    );
  }
}

const containerStyle = css`
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
`;

export class CoverTitleBackground extends React.PureComponent {
  render() {
    const {className, children} = this.props;
    return <div
      className={joinClasses(containerStyle, className)}>{children}</div>;
  }
}

const bodyStyle = css`
  background-color: rgba(255,255,255,0.5);
  text-align: left;
  user-select: none;
`;

export class CoverTitleBody extends React.PureComponent {
  render() {
    const {className, children} = this.props;
    return <div
      className={joinClasses(containerStyle, bodyStyle, className)}>{children}</div>;
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