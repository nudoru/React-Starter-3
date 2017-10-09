import React from 'react';
import { withBootStrap, buildClassName } from '../shared/BootStrapHOC';

class BBadge extends React.PureComponent {
  render() {
    return (
      <span className={buildClassName(this.props)}>{this.props.children}</span>
    );
  }
}

export const Badge =  withBootStrap('badge')(BBadge);