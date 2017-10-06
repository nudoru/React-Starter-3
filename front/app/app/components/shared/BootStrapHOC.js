import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import PropTypes from 'prop-types';
import { getNextId } from '../../utils/ElementIDCreator';

export const bootStrapPropTypes = {
  __cid      : PropTypes.string,
  __ctype    : PropTypes.string,
  bsClass    : PropTypes.string, // btn
  bsClassAlt : PropTypes.string, // outline
  ariaRole   : PropTypes.string,
  active     : PropTypes.bool,
  disabled   : PropTypes.bool,
  primary    : PropTypes.bool,
  secondary  : PropTypes.bool,
  success    : PropTypes.bool,
  danger     : PropTypes.bool,
  warning    : PropTypes.bool,
  info       : PropTypes.bool,
  light      : PropTypes.bool,
  dark       : PropTypes.bool,
  outline    : PropTypes.bool,
  link       : PropTypes.bool,
  block      : PropTypes.bool,
  vertical   : PropTypes.bool,
  justified  : PropTypes.bool,
  stacked    : PropTypes.bool,
  center     : PropTypes.bool,
  pullRight  : PropTypes.bool,
  sm         : PropTypes.bool,
  lg         : PropTypes.bool,
  flush      : PropTypes.bool,
  animated   : PropTypes.bool,
  dismissible: PropTypes.bool,
  dropShadow : PropTypes.string
};

export const COMP_TYPE = 'bootstrappedcomp';

// bsClass -> BootStrap CSS control class, btn, badge, etc.
export const withBootStrap = (bsClass = null) => Comp => {
  class Bootstrapped extends Component {

    static WrappedComponent = Comp;

    render () {
      return <Comp __cid={getNextId()} {...this.props} />;
    }
  }

  Bootstrapped.defaultProps = {
    __ctype   : COMP_TYPE,
    bsClass   : bsClass,
    bsClassAlt: '',
    dropShadow: ''
  };

  Bootstrapped.propTypes = bootStrapPropTypes;

  hoistNonReactStatic(Bootstrapped, Comp);

  return Bootstrapped;
};

/* TODO
- Need a modifier for tabs: nav nav-tabs, pills, fill
*/

// TODO how can this work as a template literal?
const stylesMapping = {
  active          : 'active',
  disabled        : 'disabled',
  dismissible     : '${cls}-dismissible',    // eslint-disable-line no-undef
  primary         : '${cls}-primary',    // eslint-disable-line no-undef
  secondary       : '${cls}-secondary',  // eslint-disable-line no-undef
  success         : '${cls}-success',    // eslint-disable-line no-undef
  danger          : '${cls}-danger',     // eslint-disable-line no-undef
  warning         : '${cls}-warning',    // eslint-disable-line no-undef
  info            : '${cls}-info',       // eslint-disable-line no-undef
  light           : '${cls}-light',      // eslint-disable-line no-undef
  dark            : '${cls}-dark',       // eslint-disable-line no-undef
  lg              : '${cls}-lg',         // eslint-disable-line no-undef
  sm              : '${cls}-sm',         // eslint-disable-line no-undef
  btn             : {
    link : '${cls}-link',             // eslint-disable-line no-undef
    block: '${cls}-block'             // eslint-disable-line no-undef
  },
  ['btn-group']   : {
    vertical: '${cls}-vertical'       // eslint-disable-line no-undef
  },
  nav             : {
    tabs     : 'nav-tabs',
    pills    : 'nav-pills',
    fill     : 'nav-fill',
    justified: 'nav-justified',
    stacked  : 'flex-column',
    pullRight: 'justify-content-end',
    center   : 'justify-content-center'
  },
  badge           : {
    pill: '${cls}-pill'             // eslint-disable-line no-undef
  },
  ['progress-bar']: {
    striped  : '${cls}-striped',         // eslint-disable-line no-undef
    animated : '${cls}-animated',         // eslint-disable-line no-undef
    info     : 'bg-info',         // eslint-disable-line no-undef
    light    : 'bg-light',         // eslint-disable-line no-undef
    dark     : 'bg-dark',         // eslint-disable-line no-undef
    success  : 'bg-success',         // eslint-disable-line no-undef
    warning  : 'bg-warning',         // eslint-disable-line no-undef
    danger   : 'bg-danger',         // eslint-disable-line no-undef
    primary  : 'bg-primary',         // eslint-disable-line no-undef
    secondary: 'bg-secondary',         // eslint-disable-line no-undef
    white    : 'bg-white'         // eslint-disable-line no-undef
  },
  ['list-group']  : {
    flush: '${cls}-flush'
  },
  jumbotron: {
    fluid: '${cls}-fluid'         // eslint-disable-line no-undef
  }
};

export const buildClassName = (props, additional) => {
  let {
        className,
        bsClass,
        outline,
        dropShadow
      }                = props,
      origionalRootCls = bsClass || null,
      extendedRootCls  = origionalRootCls;

  if (outline) {
    extendedRootCls = origionalRootCls + '-outline';
  }

  // TODO This should be using template literal
  return Object.keys(props)
    .reduce((acc, key) => {
      if (stylesMapping.hasOwnProperty(origionalRootCls) && stylesMapping[origionalRootCls][key]) {
        // Specific mapping for the component
        acc.push(stylesMapping[origionalRootCls][key].replace(/\${cls}/, extendedRootCls));
      } else if (stylesMapping[key]) {
        // General common mapping
        acc.push(stylesMapping[key].replace(/\${cls}/, extendedRootCls));
      }
      return acc;
    }, [origionalRootCls])
    .concat(additional ? additional : null)
    .concat(dropShadow.length ? `paper-shadow-${dropShadow}` : null)
    .concat(className)
    .filter(i => !!i)
    .join(' ');
};