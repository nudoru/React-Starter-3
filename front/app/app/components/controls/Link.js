import React from 'react';
import PropTypes from 'prop-types';
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
    const {onKeyDown = e => e, underline, better, className, ...rest } = this.props;
    let {ariaRole, tabIndex}              = this.props;
    let cls = [className];

    if (better) {
      cls.push('better');
    } else if (!underline) {
      cls.push('no-underline');
    }

    if (isTrivial(this.props.href)) {
      ariaRole = 'button';
    }

    if (this.props.disabled) {
      // TODO adding 'pointer-events: none;' CSS
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

Link.defaultProps = {
  underline: true
};
Link.propTypes    = {
  underline: PropTypes.bool,
  better   : PropTypes.bool
};