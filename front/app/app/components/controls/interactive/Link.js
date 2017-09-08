import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'ramda';

const isTrivial = href => !href || href.trim() === '#';

export default class Link extends React.PureComponent {
  handleClick = e => {
    const {disabled, href, onClick} = this.props;

    if (disabled || isTrivial(href)) {
      e.preventDefault();
    }

    if (disabled) {
      e.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  handleKeyDown = e => {
    if (e.key === ' ') {
      e.preventDefault();
      this.handleClick(e);
    }
  };

  render () {
    const Anchor                          = styled.a``;
    const {onKeyDown = (e) => e, ...rest} = this.props;
    let {ariaRole, tabIndex}              = this.props;

    if (isTrivial(this.props.href)) {
      ariaRole = 'button';
    }

    if (this.props.disabled) {
      // TODO adding 'pointer-events: none;' CSS
      tabIndex = -1;
    }

    return (
      <Anchor
        role={ariaRole}
        tabIndex={tabIndex}
        onClick={this.handleClick}
        onKeyDown={compose(this.handleKeyDown, onKeyDown)}
        {...rest}
      >
        {this.props.children}
      </Anchor>
    );
  }
}