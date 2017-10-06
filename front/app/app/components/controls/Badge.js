import React from 'react';
import { withBootStrap, buildClassName } from '../shared/BootStrapHOC';

class BBadge extends React.PureComponent {
  render() {
    return (
      <span className={buildClassName(this.props)}>{this.props.children}</span>
    );
  }
}

BBadge.defaultProps = {};
BBadge.propTypes = {};

export const Badge =  withBootStrap('badge')(BBadge);