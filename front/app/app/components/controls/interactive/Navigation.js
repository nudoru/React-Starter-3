import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withBootStrap, generateClassName } from '../shared/BootStrapHOC';
import Link from './Link';

// TODO
// Aria https://getbootstrap.com/docs/4.0/components/navs/#regarding-accessibility

class BNavigation extends React.PureComponent {
  render () {
    const El = styled.ul.attrs({className: generateClassName(this.props)})``;
    return (<nav role='navigation'><El>{this.props.children}</El></nav>);
  }
}

BNavigation.defaultProps = {};

BNavigation.propTypes = {
  tabs     : PropTypes.bool,
  pills    : PropTypes.bool,
  fill     : PropTypes.bool
};

// TODO handle drop down
class BNavigationItem extends React.PureComponent {
  render () {
    const {className, onClick, active, disabled, ...rest} = this.props;
    const El = styled.li.attrs({className: 'nav-item'})``;

    return (
      <El>
        <Link
          href="#"
          onClick={onClick}
          active={active}
          disabled={disabled}
          className={'nav-link' + (active ? ' active' : '') + (disabled ? ' disabled' : '') + (className ? ' ' + className : '')}
          {...rest}
        >
          {this.props.children}
        </Link>
      </El>
    );
  }
}

export const Nav     = withBootStrap('nav')(BNavigation);
export const NavItem = withBootStrap('nav-item')(BNavigationItem);
