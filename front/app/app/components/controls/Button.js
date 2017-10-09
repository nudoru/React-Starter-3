import React from 'react';
import {css} from 'emotion';
import { cleanProps, joinClasses } from '../shared/utils';
import {
  withBootStrap,
  buildClassName,
  bootStrapPropTypes
} from '../shared/BootStrapHOC';
import {shadows, gradients} from "../shared/ThemeData";


const componentStyle = css`
    transition: background .25s ease-in-out !important;
    transition: box-shadow .25s ease-in-out !important;
    border-width: 0 !important;
    cursor: pointer;
    text-transform: uppercase;
    background-image: ${gradients.light} !important;
    text-shadow: ${shadows.textDark} !important;
    &:disabled {
      cursor: not-allowed !important;
    }
`;

const linkStyle = css`
  background-image: none !important;
  text-shadow: none !important;
`;

const outlineStyle = css`
  background-image: none !important;
  text-shadow: none !important;
  border-width: 1px !important;
  .btn-outline-light:hover {
    background-color: rgba(0,0,0,0.1);
  }
`;


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
        className={joinClasses(buildClassName(this.props), componentStyle,
          'custom',
          (this.props.outline ? outlineStyle : null),
          (this.props.link ? linkStyle : null))}
        {...cleanedProps}
      >
        {this.props.children}
      </button>
    );
  }
}

export default withBootStrap('btn')(BButton);
