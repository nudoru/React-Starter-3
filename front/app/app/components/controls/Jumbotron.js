import React from 'react';
import { css } from 'emotion';
import { buildClassName, withBootStrap } from '../shared/BootStrapHOC';
import { joinClasses } from '../shared/utils';
import { Container } from './Container';

const componentStyle = css`
    border-radius: 0 !important;
  `;

class BJumbotron extends React.PureComponent {
  render () {
    return (
      <div
        className={joinClasses(buildClassName(this.props), componentStyle)}>
        <Container>{this.props.children}</Container></div>
    );
  }
}

export const Jumbotron = withBootStrap('jumbotron')(BJumbotron);