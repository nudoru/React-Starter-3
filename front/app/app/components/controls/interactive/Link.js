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
    const {onKeyDown = (e) => e, ...rest} = this.props;
    let {ariaRole, tabIndex}              = this.props;
    let El;

    if (this.props.underline) {
      El = styled.a`
      &:hover {
        text-decoration: underline;
      }
    `;
    } else if (this.props.fancy) {
      // Based on Medium https://medium.com/designing-medium/crafting-link-underlines-on-medium-7c03a9274f9
      // http://codepen.io/ghepting/pen/tLnHK/
      // TODO add media queries for .5px height on mobile
      El = styled.a`
      color: ${props => props.theme.colors.link};
      outline: none;
      text-decoration: none;
      text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
      background-image: none;
      &:active, &:hover {
        color: ${props => props.theme.colors.link};
        background-image: linear-gradient(to top, transparent, transparent 2px, ${props => props.theme.colors.link} 2px, ${props => props.theme.colors.link} 3px, transparent 3px);
        outline: none;  
      }
      &:focus {
        outline: dotted 1px;
      }
    `;
    } else {
      El = styled.a``;
    }

    if (isTrivial(this.props.href)) {
      ariaRole = 'button';
    }

    if (this.props.disabled) {
      // TODO adding 'pointer-events: none;' CSS
      tabIndex = -1;
    }

    return (
      <El
        role={ariaRole}
        tabIndex={tabIndex}
        onClick={this.handleClick}
        onKeyDown={compose(this.handleKeyDown, onKeyDown)}
        {...rest}
      />
    );
  }
}

Link.defaultProps = {
  underline: true
};
Link.propTypes    = {
  underline: PropTypes.bool,
  better   : PropTypes.bool
};