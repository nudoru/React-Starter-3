import React from 'react';
import {css} from 'emotion';
import { omit, joinClasses } from '../shared/utils';
import {
  withBootStrap,
  buildClassName,
  bootStrapPropTypes
} from '../shared/BootStrapHOC';
import {shadows, gradients} from "../shared/ThemeData";


const componentStyle = css`
    transition: background .25s ease-in-out;
    transition: box-shadow .25s ease-in-out;
    border-width: 0;
    cursor: pointer;
    text-transform: uppercase;
    background-image: ${gradients.light};
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
  text-shadow: none;
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
