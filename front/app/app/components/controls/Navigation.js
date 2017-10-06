import React from 'react';
import PropTypes from 'prop-types';
import { darken } from 'polished';
import { mergeClassNames, cleanProps, removeNulls } from '../shared/utils';
import {
  withBootStrap,
  generateClassName,
  bootStrapPropTypes
} from '../shared/BootStrapHOC';
import Link from './Link';

// TODO Aria https://getbootstrap.com/docs/4.0/components/navs/#regarding-accessibility
/*
// TODO this darkened color is a little "green"
const PillsNavULEl = NavULEl.extend`

      }
  }
`;

const TabbedNavULEl = NavULEl.extend`

  }
`;
*/
class BNavigation extends React.PureComponent {
  render () {
    return (<nav role='navigation'><ul className={generateClassName(this.props)}>{this.props.children}</ul></nav>);
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
      <li className={generateClassName(this.props)}>
        <Link
          href="#"
          onClick={onClick}
          disabled={disabled}
          underline={false}
          className={mergeClassNames('nav-link', (active ? 'active' : null), (disabled ? 'disabled' : null), (className ? className : null))}
          {...cleanedProps}
        />
      </li>
    );
  }
}

export const Nav     = withBootStrap('nav')(BNavigation);
export const NavItem = withBootStrap('nav-item')(BNavigationItem);
