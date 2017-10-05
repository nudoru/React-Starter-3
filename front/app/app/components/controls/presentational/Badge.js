import React from 'react';
import { withBootStrap, generateClassName, bootStrapPropTypes } from '../shared/BootStrapHOC';
import {mergeClassNames, cleanProps} from '../shared/utils';

class BBadge extends React.PureComponent {
  render() {
    return (
      <span className={generateClassName(this.props)}>{this.props.children}</span>
    );
  }
}

BBadge.defaultProps = {};
BBadge.propTypes = {};


export const Badge =  withBootStrap('badge')(BBadge);