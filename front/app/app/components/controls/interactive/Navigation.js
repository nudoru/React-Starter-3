import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {darken} from 'polished';
import { withBootStrap, generateClassName } from '../shared/BootStrapHOC';
import Link from './Link';

// TODO Aria https://getbootstrap.com/docs/4.0/components/navs/#regarding-accessibility

const NavULEl = styled.ul`
    .nav-item {
      .nav-link {
        transition: all ${props => props.theme.transitions.transition};
        transition-timing-function: ${props => props.theme.transitions.timingFunction};
        &:hover {
            background-color: rgba(0,0,0,.05);
        }
        &.disabled:hover {
          background-color: #fff;
        }
      }
  }
`;

// TODO this darkened color is a little "green"
const PillsNavULEl = NavULEl.extend`
    .nav-item {
      .nav-link.active:hover {
        background-color: ${props => darken(0.04, props.theme.colorList.blue)};
      }
  }
`;

const TabbedNavULEl = NavULEl.extend`
    border-bottom: 1px solid ${props => props.theme.colorList.blue}; 

    .nav-item {
      .nav-link.active {
        font-weight: 600;
        background-color: #fff;
        border-left: 1px solid ${props => props.theme.colorList.blue};
        border-top: 1px solid ${props => props.theme.colorList.blue};
        border-right: 1px solid ${props => props.theme.colorList.blue};
        box-shadow: 0px 3px -5px rgba(0,0,0,.5);
      }
      .nav-link:hover {
        border: 1px solid rgba(0,0,0,0);
      }
      .nav-link.active:hover {
        border-left: 1px solid ${props => props.theme.colorList.blue};
        border-top: 1px solid ${props => props.theme.colorList.blue};
        border-right: 1px solid ${props => props.theme.colorList.blue};
      }
  }
`;

class BNavigation extends React.PureComponent {
  render () {
    let El;

    if(this.props.tabs) {
      El = TabbedNavULEl.extend.attrs({className: generateClassName(this.props)})``;
    } else if(this.props.pills) {
      El = PillsNavULEl.extend.attrs({className: generateClassName(this.props)})``;
    } else {
      El = NavULEl.extend.attrs({className: generateClassName(this.props)})``;
    }
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
          underline={false}
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
