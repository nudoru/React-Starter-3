import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withBootStrap } from '../shared/bsHOC';
import { getBsClassName, removeEmpty } from '../shared/utils';
import Link from './Link';

/*
alignment justify-content-* : start, center, end
vertical: flex-column or flex-sm-column
tabs: nav-tabs
pills: nav-pills
fill: nav-fill
justified: nav-justified
*/

class BNavigation extends React.PureComponent {
  render() {
    let cls = ['nav'];
    const { tabs, pills, fill, justified, vertical, alignment } = this.props;

    cls.push(alignment.length ? 'justify-content-'+alignment : null);
    cls.push(tabs ? 'nav-tabs' : null);
    cls.push(pills ? 'nav-pills' : null);
    cls.push(fill ? 'nav-fill' : null);
    cls.push(justified ? 'nav-justified' : null);
    cls.push(justified ? 'nav-justified' : null);
    cls.push(vertical ? 'flex-column' : null);

    const El = styled.ul.attrs({ className: removeEmpty(cls).join(' ') })``;

    return <El>{this.props.children}</El>;
  }
}

BNavigation.defaultProps = {
  alignment: ''
};

BNavigation.propTypes = {
  tabs: PropTypes.bool,
  pills: PropTypes.bool,
  fill: PropTypes.bool,
  justified: PropTypes.bool,
  alignment: PropTypes.string
};

// Possible drop down
class BNavigationItem extends React.PureComponent {
  render() {
    const { className, onClick, active, disabled, ...rest } = this.props;

    const El = styled.li.attrs({ className: 'nav-item' })``;

    return (
      <El>
        <Link
          href="#"
          onClick={onClick}
          active={active}
          disabled={disabled}
          className={'nav-link' + (active ? ' active' : '') + (disabled ? ' disabled' : '')}
        >
          {this.props.children}
        </Link>
      </El>
    );
  }
}

export const Nav = withBootStrap('nav')(BNavigation);
export const NavItem = withBootStrap('nav-item')(BNavigationItem);
