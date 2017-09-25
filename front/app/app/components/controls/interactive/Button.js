import React from 'react';
import { cleanProps } from '../shared/utils';
import {
  withBootStrap,
  generateClassName,
  bootStrapPropTypes
} from '../shared/BootStrapHOC';

// TODO toggle
// TODO Aria
// TODO Support checkbox and radio types
// TODO Support tags: a, input
class BButton extends React.PureComponent {
  handleClick = e => {
    const {disabled, onClick} = this.props;

    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  render () {
    let {type, tabIndex, ariaRole, ...rest} = this.props,
        cleanedProps                          = cleanProps(bootStrapPropTypes, rest);

    type = type || 'button';

    if (this.props.disabled) {
      // TODO adding 'pointer-events: none;' CSS
      tabIndex = -1;
    }

    return (
      <button
        type={type}
        role={ariaRole || 'button'}
        tabIndex={tabIndex}
        onClick={this.handleClick}
        className={generateClassName(this.props)}
        {...cleanedProps}
      >
        {this.props.children}
      </button>
    );
  }
}

BButton.defaultProps = {};
BButton.propTypes    = {};

export default withBootStrap('btn')(BButton);
