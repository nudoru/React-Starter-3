import React from 'react';
import { css } from 'emotion';
import { buildClassName, withBootStrap } from '../shared/BootStrapHOC';
import { joinClasses } from '../shared/utils';
import { Container } from './Container';
import {colorList} from '../shared/ThemeData';

const componentStyle = css`
    background-color: ${colorList.grey1};
    border-radius: 0;
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