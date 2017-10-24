import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { css } from 'emotion';
import { colors } from '../shared/ThemeData';
import { joinClasses } from '../shared/utils';

// Based on https://github.com/react-bootstrap/react-bootstrap/blob/master/src/SafeAnchor.js

const isTrivial = href => !href || href.trim() === '#';

const linkStyle            = css`
  color: ${colors.link};
  &:hover {
    color: ${colors.linkHover};
    text-decoration: underline;
  }
`;
const linkNoUnderlineStyle = css`
  &:hover {
    text-decoration: none;
  }
`;
const linkBetterStyle      = css`
  color: ${colors.link};
  outline: none;
  text-decoration: none;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
  background-image: none;
  &:active, &:hover {
    color: ${colors.link};
    background-image: linear-gradient(to top, transparent, transparent 2px, ${colors.link} 2px, ${colors.link} 3px, transparent 3px);
    outline: none;
    }
  &:focus {
    outline: dotted 1px;
  }
`;

export default class Link extends React.PureComponent {
  static defaultProps = {
    underline: true
  };

  static propTypes = {
    underline: PropTypes.bool,
    better   : PropTypes.bool
  };

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
    const {onKeyDown = e => e, underline, better, className, ...rest} = this.props;
    let {ariaRole, tabIndex}                                          = this.props;
    let cls                                                           = [linkStyle];

    if (better) {
      cls.push(linkBetterStyle);
    } else if (!underline) {
      cls.push(linkNoUnderlineStyle);
    }

    if (isTrivial(this.props.href)) {
      ariaRole = 'button';
    }

    if (this.props.disabled) {
      let peNoneStyle = css`
        pointer-events: none;
        `;
      cls.push(peNoneStyle);
      tabIndex = -1;
    }

    if (className) {
      cls.push(className);
    }

    return (
      <a
        role={ariaRole}
        tabIndex={tabIndex}
        onClick={this.handleClick}
        onKeyDown={compose(this.handleKeyDown, onKeyDown)}
        className={cls.join(' ')}
        {...rest}
      />
    );
  }
}