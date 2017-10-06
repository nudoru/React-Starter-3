import React from 'react';
import PropTypes from 'prop-types';
import { darken } from 'polished';
import { joinClasses, cleanProps, removeNulls } from '../shared/utils';
import {
  withBootStrap,
  buildClassName,
  bootStrapPropTypes
} from '../shared/BootStrapHOC';
import Link from './Link';

// TODO Aria https://getbootstrap.com/docs/4.0/components/navs/#regarding-accessibility

class BNavigation extends React.PureComponent {
  render () {
    return (<nav role='navigation'><ul className={buildClassName(this.props)}>{this.props.children}</ul></nav>);
  }
}

BNavigation.defaultProps = {};

BNavigation.propTypes = {
  tabs : PropTypes.bool,
  pills: PropTypes.bool,
  fill : PropTypes.bool
};

// TODO handle drop down
class BNavigationItem extends React.PureComponent {
  render () {
    const {className, onClick, active, disabled, ...rest} = this.props;
    let cleanedProps = cleanProps(bootStrapPropTypes, rest);

    return (
      <li className={buildClassName(this.props)}>
        <Link
          href="#"
          onClick={onClick}
          disabled={disabled}
          underline={false}
          className={joinClasses('nav-link', (active ? 'active' : null), (disabled ? 'disabled' : null), (className ? className : null))}
          {...cleanedProps}
        />
      </li>
    );
  }
}

export const Nav     = withBootStrap('nav')(BNavigation);
export const NavItem = withBootStrap('nav-item')(BNavigationItem);
