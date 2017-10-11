import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import {metrics, colorList, shadows, gradients} from '../shared/ThemeData';
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
    &:hover {
      background-color: rgba(0, 0, 0, .05);
    }
    &.disabled:hover {
      background-color: #fff;
    }
  }
`;

const navTabsStyle = css`
  .nav-tabs {
    border-bottom: 1px solid ${colorList.blue};
  }
`;

const navItemTabsStyle = css`
    .nav-link {
      &.active {
        font-weight: 600;
        color: #fff;
        background-color: ${colorList.blue};
        background-image: ${gradients.light};
        border: 1px solid ${colorList.blue};
        box-shadow: 0 3px -5px rgba(0, 0, 0, .5);
        text-shadow: ${shadows.textDark};
      }
      &:hover {
        border: 1px solid rgba(0, 0, 0, 0);
        border-bottom: 1px solid ${colorList.blue};
      }
      &.active:hover {
        border: 1px solid ${colorList.blue};
      }
      &.disabled:hover {
        border-bottom: 1px solid ${colorList.blue};
      }
    }
`;

const navItemPillsStyle = css`
  .nav-link.active:hover {
    background-color: ${colorList.blue8};
  }
`;

class BNavigation extends React.PureComponent {
  static defaultProps = {};

  static propTypes = {
    tabs : PropTypes.bool,
    pills: PropTypes.bool,
    fill : PropTypes.bool
  };

  render () {
    const children = React.Children.map(this.props.children, (child, idx) => {
      return React.cloneElement(child, {
        tabs : this.props.tabs,
        pills: this.props.pills
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
    pills: PropTypes.bool
  };

  render () {
    const {className, onClick, active, disabled, tabs, pills, ...rest} = this.props;
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
            (className ? className : null) )}
          {...cleanedProps}
        />
      </li>
    );
  }
}

export const Nav     = withBootStrap('nav')(BNavigation);
export const NavItem = withBootStrap('nav-item')(BNavigationItem);
