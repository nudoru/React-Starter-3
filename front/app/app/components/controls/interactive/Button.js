import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withBootStrap, generateClassName } from '../shared/BootStrapHOC';

// TODO toggle
// TODO Aria
// TODO Support checkbox and radio types
// TODO Support tags: a, input
class BButton extends React.PureComponent {
  handleClick = e => {
    const { disabled, onClick } = this.props;

    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  // padding: ${props => props.theme.buttons.paddingTB} ${props => props.theme.buttons.paddingLR};
  // border-width: 0px;
  // TODO The padding and border-width props don't apply correctly until the 5th render
  getBasicButtonEl() {
    return styled.button`
      cursor: pointer;
      text-transform: uppercase;
      background-image: ${props => props.theme.gradients.light};
      text-shadow: ${props => props.theme.shadows.textDark};
      transition: none !important;
      &:active {
        box-shadow: ${props => props.theme.shadows.buttonPress};
      }
      &:disabled {
        cursor: not-allowed;
      }
    `;
  }

  getOutlineButtonEl() {
    return this.getBasicButtonEl().extend`
      background-image: none;
      text-shadow: none;
      border-width: 1px;
    `;
  }

  render() {
    let { type, tabIndex, ariaRole, ...rest } = this.props,
      El;

    if (this.props.outline) {
      El = this.getOutlineButtonEl().extend.attrs({className: generateClassName(this.props)})``;
    } else {
      El = this.getBasicButtonEl().extend.attrs({className: generateClassName(this.props)})``;
    }

    type = type || 'button';

    if (this.props.disabled) {
      // TODO adding 'pointer-events: none;' CSS
      tabIndex = -1;
    }

    return (
      <El
        type={type}
        role={ariaRole || 'button'}
        tabIndex={tabIndex}
        onClick={this.handleClick}
        {...rest}
      >
        {this.props.children}
      </El>
    );
  }
}

BButton.defaultProps = {};
BButton.propTypes = {};

export default withBootStrap('btn')(BButton);
