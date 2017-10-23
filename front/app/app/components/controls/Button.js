import React from 'react';
import { css } from 'emotion';
import {darken} from 'polished';
import { omit, joinClasses } from '../shared/utils';
import {
  withBootStrap,
  buildClassName,
  bootStrapPropTypes
} from '../shared/BootStrapHOC';
import { shadows, colors, transitions } from '../shared/ThemeData';

//    transform: translate(0, -0.1em);
// transform 160ms ease,
//export const FourtyFiveEffect = css`
//  background-image: linear-gradient(
//    -45deg,
//    transparent 50%,
//    rgba(0,0,0,0.1) 50.01%,
//    rgba(0,0,0,0.1) 100%
//  );
//  background-size: 250%;
//  background-position: 99% 99%;
//  &:hover, &:focus, &:active {
//    background-position: 0 0;
//    transition: background-position 240ms linear;
//  }
//`;


const makeButtonEffect = color => css`
  &:hover, &:focus, &:active {
    border: 1px solid ${darken(0.1, color)};
  }
  background-image: linear-gradient(
    -45deg,
    transparent 50%,
    ${darken(0.1, color)} 50.01%,
    ${darken(0.1, color)} 100%
  );
`;

const makeOutlineButtonEffect = color => css`
  background-color: rgba(255,0,0,0);
  background-image: linear-gradient(
    -45deg,
    transparent 50%,
    ${color} 50.01%,
    ${color} 100%
  );
`;

const componentStyle = css`
    cursor: pointer;
    border-width: 0;
    text-transform: uppercase;
    text-shadow: ${shadows.textDark};
    &:disabled {
      cursor: not-allowed;
    }
    background-size: 250%;
    background-position: 99% 99%;
    &:hover, &:focus, &:active {
      background-position: 0 0;
      transition: background-color ${transitions.timing} ${transitions.timingFunction}, border-color ${transitions.timing} ${transitions.timingFunction}, color ${transitions.timing} ${transitions.timingFunction}, background-position ${transitions.timing} ${transitions.timingFunction};
    }
`;

const linkStyle = css`
  background-image: none;
  text-shadow: none;
`;

const normalStyle = css`
  background-image: none;
  text-shadow: none !important;
  border-width: 1px;
  .btn-primary {
    ${makeButtonEffect(colors.primary)}
  }
  .btn-secondary {
    ${makeButtonEffect(colors.secondary)}
  }
  .btn-light {
    ${makeButtonEffect(colors.lightTransp)}
  }
  .btn-neutral {
    ${makeButtonEffect(colors.neutral)}
  }
  .btn-dark {
    ${makeButtonEffect(colors.dark)}
  }
  .btn-success{
    ${makeButtonEffect(colors.success)}
  }
  .btn-warning {
    ${makeButtonEffect(colors.warning)}
  }
  .btn-danger {
    ${makeButtonEffect(colors.danger)}
  }
  .btn-info {
    ${makeButtonEffect(colors.info)}
  }
`;

const outlineStyle = css`
  background-image: none;
  text-shadow: none !important;
  border-width: 1px;
  .btn-outline-primary {
    ${makeOutlineButtonEffect(colors.primary)}
  }
  .btn-outline-secondary {
    ${makeOutlineButtonEffect(colors.secondary)}
  }
  .btn-outline-light {
    ${makeOutlineButtonEffect(colors.lightTransp)}
  }
  .btn-outline-neutral {
    ${makeOutlineButtonEffect(colors.neutral)}
  }
  .btn-outline-dark {
    ${makeOutlineButtonEffect(colors.dark)}
  }
  .btn-outline-success{
    ${makeOutlineButtonEffect(colors.success)}
  }
  .btn-outline-warning {
    ${makeOutlineButtonEffect(colors.warning)}
  }
  .btn-outline-danger {
    ${makeOutlineButtonEffect(colors.danger)}
  }
  .btn-outline-info {
    ${makeOutlineButtonEffect(colors.info)}
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
        cleanedProps                        = omit(bootStrapPropTypes, rest);

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
          (this.props.outline ? outlineStyle : normalStyle),
          (this.props.link ? linkStyle : null))}
        {...cleanedProps}
      >
        {this.props.children}
      </button>
    );
  }
}

export default withBootStrap('btn')(BButton);
