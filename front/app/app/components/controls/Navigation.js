import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import {modularScale, colorList, shadows, gradients, transitions} from '../shared/ThemeData';
import { joinClasses, omit, removeNulls } from '../shared/utils';
import {
  withBootStrap,
  buildClassName,
  bootStrapPropTypes
} from '../shared/BootStrapHOC';
import Link from './Link';

// TODO Aria https://getbootstrap.com/docs/4.0/components/navs/#regarding-accessibility

const navLinkStyle = css`
  .nav-link {
    background-image: linear-gradient(
      -45deg,
      transparent 50%,
      rgba(0,0,0,0.05) 50.01%,
      rgba(0,0,0,0.05) 100%
    );
    background-size: 250%;
    background-position: 99% 99%;
    &:hover {
      background-position: 0 0;
      transition: background-position ${transitions.timing} ${transitions.timingFunction}, border-color ${transitions.timing} ${transitions.timingFunction};
    }
    &.disabled:hover {
      background-color: #fff;
    }
  }
`;

const navTabsStyle = css`
  .nav-tabs {
    border-bottom: 3px solid ${colorList.blue};
  }
`;

const navItemTabsStyle = css`
    .nav-link {
      &.active {
        color: #fff;
        background-color: ${colorList.blue};
        background-image: ${gradients.light};
        border: 1px solid ${colorList.blue};
        box-shadow: 0 3px -5px rgba(0, 0, 0, .5);
        text-shadow: ${shadows.textDark};
      }
      &.active:hover {
        border: 1px solid ${colorList.blue};
        border-bottom: 1px solid ${colorList.blue};
      }
      &:hover {
        border: 1px solid ${colorList.grey3};
        border-bottom: 1px solid ${colorList.blue};
      }
      &.disabled:hover {
        border-bottom: 1px solid ${colorList.blue};
      }
    }
`;

const navItemPillsStyle = css`
  .nav-link.active:hover {
  }
`;

const navItemStackedStyle = css`
  .nav-link {
    padding-left: ${modularScale.ms0};
    padding-top: ${modularScale.ms0};
    padding-bottom: ${modularScale.ms0};
    border-bottom: 3px solid ${colorList.grey3};
    &.active {
      color: #000;
      border-bottom: 3px solid ${colorList.blue};
    }
    &.disabled {
      border-bottom: 3px solid ${colorList.grey1};
    }
  }
`;

class BNavigation extends React.PureComponent {
  static defaultProps = {};

  static propTypes = {
    tabs : PropTypes.bool,
    pills: PropTypes.bool,
    fill : PropTypes.bool,
    stacked : PropTypes.bool
  };

  render () {
    const children = React.Children.map(this.props.children, (child, idx) => {
      return React.cloneElement(child, {
        tabs : this.props.tabs,
        pills: this.props.pills,
        stacked: this.props.stacked
      });
    });

    return (<nav role='navigation'><ul className={joinClasses(buildClassName(this.props),
      (this.props.tabs ? navTabsStyle : null))}>{children}</ul></nav>);
  }
}

class BNavigationItem extends React.PureComponent {
  static defaultProps = {};

  static propTypes = {
    tabs : PropTypes.bool,
    pills: PropTypes.bool,
    stacked : PropTypes.bool
  };

  render () {
    const {className, onClick, active, disabled, tabs, pills, stacked, ...rest} = this.props;
    let cleanedProps = omit(bootStrapPropTypes, rest);

    return (
      <li className={joinClasses(buildClassName(this.props),null)}>
        <Link
          href="#"
          onClick={onClick}
          disabled={disabled}
          underline={false}
          className={joinClasses('nav-link',
            (active ? 'active' : null),
            (disabled ? 'disabled' : null),
            navLinkStyle,
            (tabs ? navItemTabsStyle : null),
            (pills ? navItemPillsStyle : null),
            (stacked ? navItemStackedStyle : null),
            (className ? className : null) )}
          {...cleanedProps}
        />
      </li>
    );
  }
}

export const Nav     = withBootStrap('nav')(BNavigation);
export const NavItem = withBootStrap('nav-item')(BNavigationItem);
