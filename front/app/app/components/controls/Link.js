import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'ramda';
import {css} from 'emotion';

// Based on https://github.com/react-bootstrap/react-bootstrap/blob/master/src/SafeAnchor.js

const isTrivial = href => !href || href.trim() === '#';

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

  render() {
    const {onKeyDown = e => e, underline, better, className, ...rest} = this.props;
    let {ariaRole, tabIndex}                                          = this.props;
    let cls                                                           = [className];

    if (better) {
      cls.push('better');
    } else if (!underline) {
      cls.push('no-underline');
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