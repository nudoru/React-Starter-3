import React from 'react';
import {css} from 'emotion';
import {joinClasses} from "./utils";

// Container for any 3d transforms
const threedwrapper = css`
  position: relative;
  perspective: 800px;
`;

// Base styles for any 3d transformed object
const threedel = css`
  transform-style: preserve-3d;
  transform-origin: 50% 50% 0;
`;

export class ThreeDWrapper extends React.PureComponent {
  render() {
    const {className, children, ...rest} = this.props;
    return <div
      className={joinClasses(threedwrapper, className)} {...rest}>{children}</div>;
  }
}

export class ThreeDEl extends React.PureComponent {
  render() {
    const {className, children, ...rest} = this.props;
    return <div
      className={joinClasses(threedel, className)} {...rest}>{children}</div>;
  }
}
