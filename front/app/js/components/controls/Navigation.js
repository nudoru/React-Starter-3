import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import {
  colorList, colors, metrics, modularScale, navigation, shadows,
  transitions
} from '../../theme/Theme';
import {joinClasses, omit} from '../../utils/componentUtils';
import {
  createClassNameFromProps, styleComponentPropTypes,
  withStyles
} from './common/StyleManager';
import Link from './Anchor';

// TODO Aria https://getbootstrap.com/docs/4.0/components/navs/#regarding-accessibility

const navLinkStyle = css`
  ${navigation.labelFont};
  background-image: linear-gradient(
    -45deg,
    transparent 50%,
    ${colors.primary} 50.01%,
    ${colors.primary} 100%
  );
  background-size: 250%;
  background-position: 99% 99%;
  transition: background-position ${transitions.timing} ${transitions.timingFunction}, color ${transitions.timing} ${transitions.timingFunction};
  &.active {
    font-weight: 600;
  }
  &:hover {
    color: #fff;
    background-position: 0 0;
    transition: background-position ${transitions.timing} ${transitions.timingFunction}, color ${transitions.timing} ${transitions.timingFunction};
  }
  &.disabled:hover {
    background-color: #fff;
  }
`;

const navTabsStyle = css`
  border-bottom: ${metrics.accentBorderWidth} solid ${colors.primary};
`;

const navItemTabsStyle = css`
    margin-bottom: -${metrics.accentBorderWidth} !important;
    .nav-link {
      ${navigation.labelFont};
      padding-top: ${modularScale['ms-1']};
      padding-bottom: ${modularScale['ms-1']};
      border: none !important;
      &.active {
        color: #fff;
        background-color: ${colors.primary};
        text-shadow: ${shadows.textDark};
      }
      &.active:hover {
        background-color: ${colors.primary};
        background-image: none;
      }
      &:hover {
      }
      &.disabled:hover {
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

// Copy tabs styles
// Border bottoms not showing due to overrides
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
    &:hover.active {
      color: #fff;
    }
    &.disabled {
      border-bottom: ${metrics.accentBorderWidth} solid ${colorList.grey1};
    }
  }
`;

class BNavigation extends React.PureComponent {
  static defaultProps = {};

  static propTypes = {
    tabs   : PropTypes.bool,
    pills  : PropTypes.bool,
    fill   : PropTypes.bool,
    stacked: PropTypes.bool
  };

  render() {
    const children = React.Children.map(this.props.children, (child, idx) => {
      return React.cloneElement(child, {
        tabs   : this.props.tabs,
        pills  : this.props.pills,
        stacked: this.props.stacked
      });
    });

    return (<nav role='navigation'>
      <ul className={joinClasses(createClassNameFromProps(this.props),
        (this.props.tabs ? navTabsStyle : null))}>{children}</ul>
    </nav>);
  }
}

class BNavigationItem extends React.PureComponent {
  static defaultProps = {};

  static propTypes = {
    tabs   : PropTypes.bool,
    pills  : PropTypes.bool,
    stacked: PropTypes.bool
  };

  render() {
    const {className, onClick, active, disabled, tabs, pills, stacked, ...rest} = this.props;
    let cleanedProps                                                            = omit(styleComponentPropTypes, rest);

    return (
      <li className={joinClasses(createClassNameFromProps(this.props),
        (tabs ? navItemTabsStyle : null),
        (pills ? navItemPillsStyle : null),
        (stacked ? navItemStackedStyle : null)
      )}>
        <Link
          href="#"
          onClick={onClick}
          disabled={disabled}
          underline={false}
          className={joinClasses('nav-link',
            (active ? 'active' : null),
            (disabled ? 'disabled' : null),
            navLinkStyle,
            (className ? className : null))}
          {...cleanedProps}
        />
      </li>
    );
  }
}

export const Nav     = withStyles('nav')(BNavigation);
export const NavItem = withStyles('nav-item')(BNavigationItem);
