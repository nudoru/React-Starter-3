import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import {TweenMax, Back, Expo} from 'gsap';
import {Animate, TweenGroup} from "./Animate";

// Based on https://github.com/Stanko/react-animate-height/blob/master/source/AnimateHeight.js

export class Collapse extends React.PureComponent {
  static defaultProps = {
    expand: true
  };

  static propTypes = {
    expand: PropTypes.bool
  };

  state = {expanded: true};

  containerComp = null;
  contentComp   = null;
  containerEl   = null;
  contentEl     = null;

  componentDidMount() {
    this.contentHeight = this.contentComp.offsetHeight;

    // this.containerComp.style.height = `${this.contentHeight}px`;

    this.containerEl = ReactDOM.findDOMNode(this.containerComp); //eslint-disable-line react/no-find-dom-node
    this.contentEl   = ReactDOM.findDOMNode(this.contentComp); //eslint-disable-line react/no-find-dom-node

    // console.log(this.containerComp, this.containerEl);
    // console.log(this.contentComp, this.contentEl);

    // if (this.props.expand) {
    //   this._show();
    // } else {
    //   this._hide();
    // }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('wrp: ',nextProps);
  // }

  // componentDidUpdate() {
  //   // if (this.props.expand) {
  //   //   this._show();
  //   // } else {
  //   //   this._hide();
  //   // }
  // }

  // _show = _ => {
  //   this.contentComp.style.display  = '';
  //   this.containerComp.style.height = `${this.contentHeight}px`;
  // };
  //
  // _hide = _ => {
  //   this.contentComp.style.display  = 'none';
  //   this.containerComp.style.height = '0';
  // };

  // TODO remove this dep
  // Provides a delay so the DOM els are mounted
  _componentIntroTween = ({target, callBack}) => {
    return TweenMax.from(target, 0.1, {
      onComplete: callBack
    });
  };

  _showContentTween = () => {
    return [
      TweenMax.to(this.containerEl, 0.5, {
        height: this.contentHeight,
        ease  : Expo.easeIn
      }),
      TweenMax.to(this.contentEl, 0.25, {
        ease     : Expo.easeIn,
        delay    : 0.25,
        autoAlpha: 1
      })
    ];
  };

  _hideContentTween = () => {
    return [
      TweenMax.to(this.containerEl, 0.5, {
        height: 0,
        ease  : Expo.easeOut
      }),
      TweenMax.to(this.contentEl, 0.25, {
        ease     : Expo.easeOut,
        delay    : 0.25,
        autoAlpha: 0
      })
    ]
  };

  render() {

    const {className, children, style, ...rest} = this.props;

    const containerStyle = {
      ...style,
      overflow: 'hidden'
    };

    // TODO needs to update on the START of show and END of hide
    const contentStyle = {
      display: this.state.expanded ? '' : 'none'
    };


    return (

      <Animate>
        <TweenGroup
          enter={this._componentIntroTween}
          tween={this.props.expand ? this._showContentTween : this._hideContentTween}
        >

          <div>
            <div
              aria-hidden={!this.state.expanded}
              ref={comp => this.containerComp = comp}
              style={containerStyle}
              className='debug-container'
            >
              <div
                className={className}
                ref={comp => this.contentComp = comp}
                style={contentStyle}
              >
                {children}
              </div>
            </div>
          </div>
        </TweenGroup>
      </Animate>
    );
  }
}