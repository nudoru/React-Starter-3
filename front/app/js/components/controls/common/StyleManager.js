import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import {getNextId} from '../../../utils/ElementIDCreator';
import {shadows} from '../../../theme/Theme';

export const styleComponentPropTypes = {
  __cid            : PropTypes.string,
  __ctype          : PropTypes.string,
  componentCSSClass: PropTypes.string, // btn
  ariaRole         : PropTypes.string,
  active           : PropTypes.bool,
  disabled         : PropTypes.bool,
  primary          : PropTypes.bool,
  secondary        : PropTypes.bool,
  success          : PropTypes.bool,
  danger           : PropTypes.bool,
  warning          : PropTypes.bool,
  info             : PropTypes.bool,
  light            : PropTypes.bool,
  dark             : PropTypes.bool,
  outline          : PropTypes.bool,
  link             : PropTypes.bool,
  block            : PropTypes.bool,
  vertical         : PropTypes.bool,
  justified        : PropTypes.bool,
  stacked          : PropTypes.bool,
  center           : PropTypes.bool,
  pullRight        : PropTypes.bool,
  sm               : PropTypes.bool,
  lg               : PropTypes.bool,
  flush            : PropTypes.bool,
  animated         : PropTypes.bool,
  dismissible      : PropTypes.bool,
  dropShadow       : PropTypes.string
};

export const COMP_TYPE = '@@__styledcomp__';

// componentCSSClass -> BootStrap CSS control class, btn, badge, etc.
export const withStyles = (componentCSSClass = null) => SrcComp => {
  // This should NOT be a Pure since it may need to update on deep/context changes
  class StyleComponent extends React.Component {

    static WrappedComponent = SrcComp;

    static defaultProps = {
      __ctype          : COMP_TYPE,
      componentCSSClass: componentCSSClass
    };

    static propTypes = styleComponentPropTypes;

    render() {
      return <SrcComp __cid={getNextId()} {...this.props} />;
    }
  }

  hoistNonReactStatic(StyleComponent, SrcComp);

  return StyleComponent;
};

// Map prop values to CSS classes
// TODO how can this work as a template literal?
const propsToCSSClassMap = {
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
  xs              : '${cls}-xs',
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

export const createClassNameFromProps = props => {
  let {
        className,
        componentCSSClass,
        outline,
        dropShadow
      }                = props,
      origionalRootCls = componentCSSClass || null,
      extendedRootCls  = origionalRootCls;

  if (outline) {
    extendedRootCls = origionalRootCls + '-outline';
  }

  // TODO This should be using template literal
  return Object.keys(props)
    .reduce((acc, key) => {
      if (propsToCSSClassMap.hasOwnProperty(origionalRootCls) && propsToCSSClassMap[origionalRootCls][key]) {
        // Specific mapping for the component
        acc.push(propsToCSSClassMap[origionalRootCls][key].replace(/\${cls}/, extendedRootCls));
      } else if (propsToCSSClassMap[key]) {
        // General common mapping
        acc.push(propsToCSSClassMap[key].replace(/\${cls}/, extendedRootCls));
      }
      return acc;
    }, [origionalRootCls])
    .concat(dropShadow ? css`box-shadow: ${shadows.dropShadow[dropShadow]}` : null)
    .concat(className)
    .filter(i => !!i) // remove any nulls
    .join(' ');
};