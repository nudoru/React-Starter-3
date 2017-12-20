import React from 'react';
import { css } from 'emotion';
import { buildClassName, withStyles } from './common/StyleManager';
import { joinClasses } from '../../utils/componentUtils';
import { Container } from './containers/Container';
import {colorList, modularScale} from '../../theme/Theme';

const componentStyle = css`
    background-color: ${colorList.grey1};
    border-radius: 0;
    padding: ${modularScale.ms4} ${modularScale.ms2}
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

export const Jumbotron = withStyles('jumbotron')(BJumbotron);