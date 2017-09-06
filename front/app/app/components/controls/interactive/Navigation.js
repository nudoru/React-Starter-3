import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withBootStrap } from '../shared/bsHOC';
import { getBsClassName } from '../shared/utils';
import Link from './Link';

/*
alignment justify-content-* : start, center, end
vertical: flex-column or flex-sm-column
tabs: nav-tabs
pills: nav-pills
fill: nav-fill
justify: nav-justified
*/

class BNavigation extends React.PureComponent {
  render() {
    return <ul className="nav">{this.props.children}</ul>;
  }
}

BNavigation.defaultProps = {};

BNavigation.propTypes = {
  tabs: PropTypes.bool,
  pills: PropTypes.bool,
  fill: PropTypes.bool,
  justify: PropTypes.bool,
  alignment: PropTypes.string
};

// Possible drop down
class BNavigationItem extends React.PureComponent {
  render() {
    // active or disabled
    const { className, onClick, active, disabled, ...rest } = this.props;

    return (
      <li className="nav-item" {...rest}>
        <Link
          href="#"
          onClick={onClick}
          className={'nav-link' + (active ? ' active' : '')}
        >
          {this.props.children}
        </Link>
      </li>
    );
  }
}

export const Nav = withBootStrap('nav')(BNavigation);
export const NavItem = withBootStrap('nav-item')(BNavigationItem);
