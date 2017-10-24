import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import {modularScale, colorList, colors, shadows, gradients, transitions, metrics} from '../shared/Theme';
import { joinClasses, omit } from '../shared/utils';
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
      ${colors.exposabeContentBg} 50.01%,
      ${colors.exposabeContentBg} 100%
    );
    background-size: 250%;
    background-position: 99% 99%;
    &:hover {
      background-position: 0 0;
      transition: background-position ${transitions.timing} ${transitions.timingFunction}, border ${transitions.timing} ${transitions.timingFunction};
    }
    &.disabled:hover {
      background-color: #fff;
    }
  }
`;

const navTabsStyle = css`
  .nav-tabs {
    border-bottom: ${metrics.accentBorderWidth} solid ${colors.primary};
  }
`;

const navItemTabsStyle = css`
    .nav-link {
      padding-top: ${modularScale['ms-1']};
      padding-bottom: ${modularScale['ms-1']};
      z-index: 1;
      &.active {
        color: #fff;
        background-color: ${colors.primary};
        border: 1px solid ${colors.primary};
        text-shadow: ${shadows.textDark};
      }
      &.active:hover {
        background-color: ${colors.primary};
        background-image: none;
        border: 1px solid ${colors.primary};
        border-bottom: 1px solid ${colors.primary};
      }
      &:hover {
        border: 1px solid ${colorList.grey3};
        border-bottom: 1px solid ${colors.primary};
      }
      &.disabled:hover {
        border-bottom: 1px solid ${colors.primary};
      }
    }
`;

const navItemPillsStyle = css`
  .nav-link.active {
    background-color: ${colors.primary};
  }
  .nav-link.active:hover {
    background-image: none;
  }
`;

const navItemStackedStyle = css`
  .nav-link {
    padding-left: ${modularScale.ms0};
    padding-top: ${modularScale.ms0};
    padding-bottom: ${modularScale.ms0};
    border-bottom: ${metrics.accentBorderWidth} solid ${colorList.grey3};
    &.active {
      color: #000;
      border-bottom: ${metrics.accentBorderWidth} solid ${colors.primary};
    }
    &.disabled {
      border-bottom: ${metrics.accentBorderWidth} solid ${colorList.grey1};
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
