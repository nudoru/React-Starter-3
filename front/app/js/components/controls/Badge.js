import React from 'react';
import { withStyles, createClassNameFromProps } from './common/StyleManager';

class BBadge extends React.PureComponent {
  render() {
    return (
      <span className={createClassNameFromProps(this.props)}>{this.props.children}</span>
    );
  }
}

export const Badge =  withStyles('badge')(BBadge);