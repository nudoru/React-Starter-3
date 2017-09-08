// Borrowing from https://github.com/react-bootstrap/react-bootstrap/blob/master/src/SafeAnchor.js

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'ramda';
import { withBootStrap } from '../shared/bsHOC';
import { getBsClassName } from '../shared/utils';

const isTrivial = href => !href || href.trim() === '#';

export default class Link extends React.PureComponent {
  handleClick = e => {
    const { disabled, href, onClick } = this.props;

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

  render() {
    //Removed duplicate .attrs({ className: getBsClassName(this.props) })
    const Anchor = styled.a``;
    const { onClick, onKeyDown=(e)=>e, ...rest } = this.props;
    let { ariaRole, tabIndex } = this.props;

    if (isTrivial(this.props.href)) {
      ariaRole = 'button';
    }

    if (this.props.disabled) {
      tabIndex = -1;
      // TODO adding 'pointer-events: none;' CSS
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

// export default withBootStrap('')(Link);
