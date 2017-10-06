import React from 'react';
import {css} from 'emotion';
import { generateClassName, withBootStrap } from '../shared/BootStrapHOC';
import {joinClasses} from '../shared/utils';
import { Container } from './Container';

const JUMBO_CSS = css`
    border-radius: 0 !important;
  `;

class BJumbotron extends React.PureComponent {
  render () {
    return (
      <div className={joinClasses(generateClassName(this.props), JUMBO_CSS)}>
        <Container>{this.props.children}</Container></div>
    );
  }
}

BJumbotron.defaultProps = {};
BJumbotron.propTypes    = {};

export const Jumbotron = withBootStrap('jumbotron')(BJumbotron);