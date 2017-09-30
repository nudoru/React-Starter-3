import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {TweenMax, Back} from 'gsap';
import {css} from 'emotion';
import {Animate, TweenGroup} from '../shared/Animate';
import {cleanProps, mergeClassNames} from '../shared/utils';

const showContent = ({target, callBack}) => {
  return TweenMax.to(target, 0.5, {
    y         : 0,
    ease      : Back.easeOut,
    onComplete: callBack
  });
};

// TODO y need to be cover height - content header height
const hideContent = ({target, callBack}) => {
  return TweenMax.to(target, 0.75, {
    y         : 0,
    ease      : Back.easeInOut,
    onComplete: callBack
  });
};

// TODO setinintial state - w/ text hidden

const coverIntro = ({target, callBack}) => {
  return TweenMax.from(target, 0.5, {
    scale     : 0.75,
    alpha     : 0,
    ease      : Back.easeOut,
    onComplete: callBack
  });
};

const COVER_CHILD_CSS = css`
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;


//----------------------------------------------------------------------------------------------------------------------
// Flip container
//----------------------------------------------------------------------------------------------------------------------

export class CoverTitle extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state      = {contentVisible: false};
    this.bodyEl     = null;
    this.bodTitleEl = null;
  }

  _onCoverMouseEnter = () => {
    console.log('mouse enter');
  };

  _onCoverMouseLeave = () => {
    console.log('mouse leave');
  };

  _onToggleContent = () => {
    this.setState(s => ({contentVisible: !s.contentVisible}));
  };


  _getContainerCSS = () => {
    return css`width:${this.props.width}px; height:${this.props.height}px; `
  };

  render() {
    const {children: originalChildren, className, ...rest} = this.props;

    // TODO get refs to body and title
    const children = React.Children.map(originalChildren, (child, idx) => {
      return React.cloneElement(child, {});
    });

    return (
      <div className='threedwrapper'>
        <Animate>
          <TweenGroup
            enter={coverIntro}
            tween={this.state.contentVisible ? showContent : hideContent}
          >
            <div
              onMouseEnter={this._onCoverMouseEnter}
              onMouseLeave={this._onCoverMouseLeave}
              className={mergeClassNames([this._getContainerCSS(), 'threedobject'].join(' '), className)}>
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
  height: 400
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
  background-color: rgba(255,255,255,0.75);
  border-bottom: 1px solid #fff;
  padding: 1rem;
`;

const coverTitleTextCSS = css`
  padding: 1rem;
`;

export const CoverTitleBackground = ({className, children}) => <div
  className={mergeClassNames(COVER_CHILD_CSS, className)}>{children}</div>;

export const CoverTitleBody = ({className, children}) => <div
  className={mergeClassNames([COVER_CHILD_CSS, coverTitleBodyCSS].join(' '), className)}>{children}</div>;

export const CoverTitleTitle = ({className, children}) => <div
  className={mergeClassNames(coverTitleTitleCSS, className)}>{children}</div>;

export const CoverTitleText = ({className, children}) => <div
  className={mergeClassNames(coverTitleTextCSS, className)}>{children}</div>;
