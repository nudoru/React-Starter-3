import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {TweenMax, Back, Expo} from 'gsap';
import {css} from 'emotion';
import {Animate, TweenGroup} from '../shared/Animate';
import {mergeClassNames} from '../shared/utils';

const COVER_CHILD_CSS = css`
  cursor: pointer;
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

//----------------------------------------------------------------------------------------------------------------------
// Container
//----------------------------------------------------------------------------------------------------------------------

const wrapperCSS = css`
  overflow: hidden;
`;

export class CoverTitle extends React.PureComponent {

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
    return css`width:${this.props.width}px; height:${this.props.height}px; `
  };

  componentDidMount() {
    this.backgroundEl = ReactDOM.findDOMNode(this.backgroundComp); //eslint-disable-line react/no-find-dom-node
    this.bodyEl       = ReactDOM.findDOMNode(this.bodyComp); //eslint-disable-line react/no-find-dom-node

    // TODO forces the title to be the first child
    this.bodyTitleEl = this.bodyEl.firstChild;

    if (this.bodyTitleEl) {
      this.bodyDefaultY = this.props.height - this.bodyTitleEl.clientHeight;
    }

    TweenMax.set(this.bodyEl, {y: this.bodyDefaultY});
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
      TweenMax.to(this.backgroundEl, 0.5, {
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
      TweenMax.to(this.backgroundEl, 0.5, {
        scale: 1,
        ease : Expo.easeOut
      }),
      TweenMax.to(this.bodyEl, 0.75, {
        y   : this.bodyDefaultY,
        ease: Expo.easeOut
      })];
  };

  render() {
    const {children: originalChildren, className, ...rest} = this.props;

    const children = React.Children.map(originalChildren, (child, idx) => {
      let props = {};
      // TODO Has to be a better way to do this ...
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
        className={mergeClassNames(['threedwrapper', wrapperCSS].join(' '), className)}>
        <Animate>
          <TweenGroup
            enter={this._coverIntro}
            tween={this.state.bodyVisible ? this._showContent : this._hideContent}
          >
            <div
              onMouseEnter={this._onCoverMouseEnter}
              onMouseLeave={this._onCoverMouseLeave}
              className={[this._getContainerCSS(), 'threedobject'].join(' ')}>
              {children}
            </div>
          </TweenGroup>
        </Animate>
      </div>
    );
  }
}

CoverTitle.defaultProps = {
  width : 300,
  height: 300
};

CoverTitle.propTypes = {
  width : PropTypes.number,
  height: PropTypes.number
};


const coverTitleBodyCSS = css`
  background-color: rgba(255,255,255,0.5);
  text-align: left;
`;

const coverTitleTitleCSS = css`
  padding: 1rem;
`;

const coverTitleTextCSS = css`
  padding: 1rem;
`;

export class CoverTitleBackground extends React.PureComponent {
  render() {
    const {className, children} = this.props;
    return <div
      className={mergeClassNames(COVER_CHILD_CSS, className)}>{children}</div>;
  }
}

CoverTitleBackground.defaultProps = {};
CoverTitleBackground.propTypes    = {};

export class CoverTitleBody extends React.PureComponent {
  render() {
    const {className, children} = this.props;
    return <div
      className={mergeClassNames([COVER_CHILD_CSS, coverTitleBodyCSS].join(' '), className)}>{children}</div>;
  }
}

CoverTitleBody.defaultProps = {};
CoverTitleBody.propTypes    = {};

export const CoverTitleTitle = ({className, children}) => <div
  className={mergeClassNames(coverTitleTitleCSS, className)}>{children}</div>;

export const CoverTitleText = ({className, children}) => <div
  className={mergeClassNames(coverTitleTextCSS, className)}>{children}</div>;
