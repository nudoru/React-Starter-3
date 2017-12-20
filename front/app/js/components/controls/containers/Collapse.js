import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import {TweenMax, Expo} from 'gsap';
import {Animate, TweenGroup} from "../common/Animate";
import {joinClasses, omit} from "../../../utils/componentUtils";

const containerStyle = css`
  overflow: hidden;
`;

export class Collapse extends React.PureComponent {
  static defaultProps = {
    expand: true
  };

  static propTypes = {
    expand: PropTypes.bool
  };

  state = {expanded: true};

  animating     = false;
  containerComp = null;
  contentComp   = null;
  containerEl   = null;
  contentEl     = null;

  componentDidMount() {
    this.containerEl = ReactDOM.findDOMNode(this.containerComp); //eslint-disable-line react/no-find-dom-node
    this.contentEl   = ReactDOM.findDOMNode(this.contentComp); //eslint-disable-line react/no-find-dom-node

    // Initial hide content
    if (!this.props.expand) {
      TweenMax.set(this.containerEl, {height: 0});
      TweenMax.set(this.contentEl, {autoAlpha: 0});
    }
  }

  _showContentTween = _ => {
    return [
      TweenMax.set(this.containerEl, {height: 'auto'}),
      TweenMax.from(this.containerEl, 0.5, {
        height    : 0,
        ease      : Expo.easeOut,
        onStart   : this._onToggleStart,
        onComplete: this._onToggleComplete
      }),
      TweenMax.to(this.contentEl, 0.5, {
        autoAlpha: 1
      })
    ];
  };

  _hideContentTween = _ => {
    return [
      TweenMax.to(this.containerEl, 0.5, {
        height    : 0,
        ease      : Expo.easeOut,
        onStart   : this._onToggleStart,
        onComplete: this._onToggleComplete
      }),
      TweenMax.to(this.contentEl, 0.5, {
        autoAlpha: 0
      })
    ]
  };

  _onToggleStart = _ => {
    this.animating = true;
  };

  _onToggleComplete = _ => {
    this.animating = false;
  };

  render() {
    const {className, children, ...rest} = this.props;

    const cleanedProps = omit(Collapse.propTypes, rest);

    return (
      <Animate>
        <TweenGroup
          tween={this.props.expand ? this._showContentTween : this._hideContentTween}
          immediate={false}
        >
          <div
            aria-hidden={!this.props.expand}
            ref={comp => this.containerComp = comp}
            className={joinClasses(className, containerStyle)}
            {...cleanedProps}
          >
            <div ref={comp => this.contentComp = comp}>
              {children}
            </div>
          </div>
        </TweenGroup>
      </Animate>
    );
  }
}