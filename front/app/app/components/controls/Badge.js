import React from 'react';
import { withStyles, buildClassName } from '../shared/StyleManager';

class BBadge extends React.PureComponent {
  render() {
    return (
      <span className={buildClassName(this.props)}>{this.props.children}</span>
    );
  }
}

export const Badge =  withStyles('badge')(BBadge);