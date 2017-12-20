import React from 'react';
import ReactDOM from 'react-dom';
import {css} from 'emotion';
import {TweenMax, Expo} from 'gsap';
import {Animate, TweenGroup} from "../common/Animate";
import {joinClasses, omit} from "../../../utils/componentUtils";

const containerStyle = css`
  overflow: hidden;
`;

export class Expando extends React.PureComponent {
  static defaultProps = {};
  static propTypes = {};

  containerComp     = null;
  contentComp       = null;
  containerEl       = null;
  contentEl         = null;
  prevContentHeight = 0;
  contentHeight     = 0;

  componentDidMount() {
    this.containerEl = ReactDOM.findDOMNode(this.containerComp); //eslint-disable-line react/no-find-dom-node
    this.contentEl   = ReactDOM.findDOMNode(this.contentComp); //eslint-disable-line react/no-find-dom-node

    this.contentHeight = this.contentComp.offsetHeight;
    this.prevContentHeight = this.contentHeight;
  }

  componentWillUpdate(nextProps) {
    this.prevContentHeight = this.contentComp.offsetHeight;
  }

  componentDidUpdate() {
    this.contentHeight = this.contentComp.offsetHeight;
  }

  _expandToContentTween = _ => {
    return [
      TweenMax.set(this.containerEl, {height: 'auto'}),
      TweenMax.from(this.containerEl, 1, {
        height: this.prevContentHeight,
        ease  : Expo.easeOut
      })
    ];
  };

  render() {
    const {className, children, ...rest} = this.props;

    const cleanedProps = omit(Expando.propTypes, rest);

    return (
      <Animate>
        <TweenGroup
          tween={this._expandToContentTween}
          forceUpdate
        >
          <div
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