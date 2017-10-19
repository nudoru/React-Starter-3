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

    static defaultProps = {
      __ctype   : COMP_TYPE,
      bsClass   : bsClass,
      bsClassAlt: '',
      dropShadow: ''
    };

    static propTypes = bootStrapPropTypes;

    render () {
      return <Comp __cid={getNextId()} {...this.props} />;
    }
  }

  hoistNonReactStatic(Bootstrapped, Comp);

  return Bootstrapped;
};

// TODO how can this work as a template literal?
const stylesMapping = {
  active          : 'active',
  disabled        : 'disabled',
  dismissible     : '${cls}-dismissible',
  primary         : '${cls}-primary',
  secondary       : '${cls}-secondary',
  success         : '${cls}-success',
  danger          : '${cls}-danger',
  warning         : '${cls}-warning',
  info            : '${cls}-info',
  light           : '${cls}-light',
  dark            : '${cls}-dark',
  lg              : '${cls}-lg',
  sm              : '${cls}-sm',
  btn             : {
    link : '${cls}-link',
    block: '${cls}-block'
  },
  ['btn-group']   : {
    vertical: '${cls}-vertical'
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
    pill: '${cls}-pill'
  },
  ['progress-bar']: {
    striped  : '${cls}-striped',
    animated : '${cls}-animated',
    info     : 'bg-info',
    light    : 'bg-light',
    dark     : 'bg-dark',
    success  : 'bg-success',
    warning  : 'bg-warning',
    danger   : 'bg-danger',
    primary  : 'bg-primary',
    secondary: 'bg-secondary',
    white    : 'bg-white'
  },
  ['list-group']  : {
    flush: '${cls}-flush'
  },
  jumbotron       : {
    fluid: '${cls}-fluid'
  },
  table           : {
    dark      : '${cls}-dark',
    striped   : '${cls}-striped',
    bordered  : '${cls}-bordered',
    hover     : '${cls}-hover',
    responsive: '${cls}-responsive'
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