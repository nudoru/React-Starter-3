import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {TweenMax, Expo} from 'gsap';
import {Animate, TweenGroup} from "./Animate";
import {cleanProps} from "./utils";

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

    this.containerComp.style.height = `${this.contentHeight}px`;

    this.containerEl = ReactDOM.findDOMNode(this.containerComp); //eslint-disable-line react/no-find-dom-node
    this.contentEl   = ReactDOM.findDOMNode(this.contentComp); //eslint-disable-line react/no-find-dom-node
  }

  _showContentTween = () => {
    return [
      TweenMax.to(this.containerEl, 0.5, {
        height: this.contentHeight,
        ease  : Expo.easeOut
      }),
      TweenMax.to(this.contentEl, 0.25, {
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
        autoAlpha: 0
      })
    ]
  };

  render() {
    const {className, children, style, ...rest} = this.props;

    const cleanedProps = cleanProps(Collapse.propTypes, rest);

    const containerStyle = {
      ...style,
      overflow: 'hidden'
    };

    const contentStyle = {
      display: this.state.expanded ? '' : 'none'
    };


    return (
      <Animate>
        <TweenGroup
          tween={this.props.expand ? this._showContentTween : this._hideContentTween}
        >
          <div
            aria-hidden={!this.props.expand}
            ref={comp => this.containerComp = comp}
            style={containerStyle}
            className={className}
            {...cleanedProps}
          >
            <div
              ref={comp => this.contentComp = comp}
              style={contentStyle}
            >
              {children}
            </div>
          </div>
        </TweenGroup>
      </Animate>
    );
  }
}