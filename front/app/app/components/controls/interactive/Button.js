import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withBootStrap,  generateClassName} from '../shared/bsHOC';

// TODO
// toggle
// Aria
// Support checkbox and radio types
// Support tags: a, input
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
    let {type, tabIndex, ariaRole, ...rest} = this.props;
    const El = styled.button.attrs({className: generateClassName(this.props)})``;

    type = type || 'button';

    if (this.props.disabled) {
      // TODO adding 'pointer-events: none;' CSS
      tabIndex = -1;
    }

    return (
      <El type={type}
          role={ariaRole || 'button'}
          tabIndex={tabIndex}
          onClick={this.handleClick}
          {...rest}>{this.props.children}</El>
    );
  }
}

BButton.defaultProps = {};
BButton.propTypes = {};

export default withBootStrap('btn')(BButton);