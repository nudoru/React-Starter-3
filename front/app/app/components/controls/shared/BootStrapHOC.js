import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import RHUTheme from '../theme/rh';
import { getNextId } from '../../../utils/ElementIDCreator';

// bsClass -> BootStrap CSS control class, btn, badge, etc.
export const withBootStrap = (bsClass = null) => Comp => {
  class Bootstrapped extends Component {

    static WrappedComponent = Comp;

    render () {
      return (
        <ThemeProvider theme={RHUTheme}>
          <Comp cid={getNextId()} {...this.props} />
        </ThemeProvider>
      );
    }
  }

  Bootstrapped.defaultProps = {
    bsClass   : bsClass,
    bsClassAlt: ''
  };

  Bootstrapped.propTypes = {
    bsClass   : PropTypes.string, // btn
    bsClassAlt: PropTypes.string, // outline
    ariaRole  : PropTypes.string,
    active    : PropTypes.bool,
    disabled  : PropTypes.bool,
    primary   : PropTypes.bool,
    secondary : PropTypes.bool,
    success   : PropTypes.bool,
    danger    : PropTypes.bool,
    warning   : PropTypes.bool,
    info      : PropTypes.bool,
    light     : PropTypes.bool,
    dark      : PropTypes.bool,
    outline   : PropTypes.bool,
    block     : PropTypes.bool,
    vertical  : PropTypes.bool,
    justified : PropTypes.bool,
    stacked   : PropTypes.bool,
    center    : PropTypes.bool,
    pullRight : PropTypes.bool,
    sm        : PropTypes.bool,
    lg        : PropTypes.bool,
    flush     : PropTypes.bool
  };

  hoistNonReactStatic(Bootstrapped, Comp);

  return Bootstrapped;
};

/* TODO
- Need a modifier for tabs: nav nav-tabs, pills, fill
*/

// TODO how can this work as a template literal?
const stylesMapping = {
  active        : 'active',
  disabled      : 'disabled',
  primary       : '${cls}-primary',    // eslint-disable-line no-undef
  secondary     : '${cls}-secondary',  // eslint-disable-line no-undef
  success       : '${cls}-success',    // eslint-disable-line no-undef
  danger        : '${cls}-danger',     // eslint-disable-line no-undef
  warning       : '${cls}-warning',    // eslint-disable-line no-undef
  info          : '${cls}-info',       // eslint-disable-line no-undef
  light         : '${cls}-light',      // eslint-disable-line no-undef
  dark          : '${cls}-dark',       // eslint-disable-line no-undef
  lg            : '${cls}-lg',         // eslint-disable-line no-undef
  sm            : '${cls}-sm',         // eslint-disable-line no-undef
  btn           : {
    link : '${cls}-link',             // eslint-disable-line no-undef
    block: '${cls}-block'             // eslint-disable-line no-undef
  },
  ['btn-group'] : {
    vertical: '${cls}-vertical'       // eslint-disable-line no-undef
  },
  nav           : {
    tabs     : 'nav-tabs',
    pills    : 'nav-pills',
    fill     : 'nav-fill',
    justified: 'nav-justified',
    stacked  : 'flex-column',
    pullRight: 'justify-content-end',
    center   : 'justify-content-center'
  },
  ['list-group']: {
    flush: '${cls}-flush'
  }
};

export const generateClassName = (props, additional) => {
  let {
        className,
        bsClass,
        outline
      }                = props,
      origionalRootCls = bsClass || null,
      extendedRootCls  = origionalRootCls;

  if (outline) {
    extendedRootCls = origionalRootCls + '-outline';
  }

  return Object.keys(props)
    .reduce((acc, key) => {
      if (stylesMapping[key]) {
        acc.push(stylesMapping[key].replace(/\${cls}/, extendedRootCls));
      } else if (stylesMapping.hasOwnProperty(origionalRootCls) && stylesMapping[origionalRootCls][key]) {
        acc.push(stylesMapping[origionalRootCls][key].replace(/\${cls}/, extendedRootCls));
      }
      return acc;
    }, [origionalRootCls])
    .concat(additional ? additional : null)
    .concat(className)
    .filter(i => !!i)
    .join(' ');
};