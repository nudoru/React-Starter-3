import React from 'react';
import {css} from 'emotion';
import { omit, joinClasses } from '../shared/utils';
import {
  withBootStrap,
  buildClassName,
  bootStrapPropTypes
} from '../shared/BootStrapHOC';
import {shadows, metrics} from "../shared/ThemeData";

//    transform: translate(0, -0.1em);
// transform 160ms ease,
export const FourtyFiveEffect = css`
  background-image: linear-gradient(
    -45deg,
    transparent 50%,
    rgba(0,0,0,0.1) 50.01%,
    rgba(0,0,0,0.1) 100%
  );
  background-size: 250%;
  background-position: 99% 99%;
  &:hover, &:focus, &:active {
    box-shadow: 0 0.4em 0.25em -0.2em rgba(0, 0, 0, 0.15);
    background-position: 0 0;
    transition: box-shadow 120ms linear, background-position 240ms linear;
  }
`;

/*
transition: background .25s ease-in-out;
    transition: box-shadow .25s ease-in-out;
 */
const componentStyle = css`
    ${FourtyFiveEffect};
    border-width: 0;
    cursor: pointer;
    text-transform: uppercase;
    text-shadow: ${shadows.textDark};
    &:disabled {
      cursor: not-allowed;
    }
`;

const linkStyle = css`
  background-image: none;
  text-shadow: none;
`;

const outlineStyle = css`
  background-image: none;
  text-shadow: none !important;
  border-width: 1px;
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
        cleanedProps                          = omit(bootStrapPropTypes, rest);

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
