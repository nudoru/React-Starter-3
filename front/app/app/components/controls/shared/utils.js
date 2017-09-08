//import { SIZE, SIZE_MAP, DEVICE_SIZES, STYLE, STATE } from './BsStyles';
//import {
//  ARIA_WIDGETS,
//  ARIA_COMPOSITE_WIDGETS,
//  ARIA_LANDMARK,
//  ARIA_DOCUMENT
//} from './Aria';
// bootstrap class -> aria role
//export const bsAriaMap = {
//  btn: ARIA_WIDGETS.button
//};

/* TODO
- Need a modifier for tabs: nav nav-tabs, pills, fill
*/

// TODO how can this work as a template literal?
let map = {
  active   : 'active',
  disabled : 'disabled',
  primary  : '${cls}-primary',    // eslint-disable-line no-undef
  secondary: '${cls}-secondary',  // eslint-disable-line no-undef
  success  : '${cls}-success',    // eslint-disable-line no-undef
  danger   : '${cls}-danger',     // eslint-disable-line no-undef
  warning  : '${cls}-warning',    // eslint-disable-line no-undef
  info     : '${cls}-info',       // eslint-disable-line no-undef
  light    : '${cls}-light',      // eslint-disable-line no-undef
  dark     : '${cls}-dark',       // eslint-disable-line no-undef
  link     : '${cls}-link',       // eslint-disable-line no-undef
  lg       : '${cls}-lg',         // eslint-disable-line no-undef
  sm       : '${cls}-sm',         // eslint-disable-line no-undef
  block    : '${cls}-block',      // eslint-disable-line no-undef
  tabs     : 'nav-tabs',
  pills    : 'nav-pills',
  fill     : 'nav-fill',
  justified: 'nav-justified',
  stacked  : 'flex-column',
  pullRight: 'justify-content-end',
  center   : 'justify-content-center'
};

export const getBsClassName = (props, additional) => {
  let {
        className,
        bsClass,
        bsClassAlt,
        bsModifier,
        outline
      }                = props,
      origionalRootCls = bsClass,
      extendedRootCls  = origionalRootCls;

  if (outline) {
    extendedRootCls = origionalRootCls + '-outline';
  }

  return Object.keys(props)
    .reduce((acc, key) => {
      if (map[key]) {
        acc.push(map[key].replace(/\${cls}/, extendedRootCls));
      }
      return acc;
    }, [origionalRootCls])
    .concat(bsModifier ? bsModifier : null)
    .concat(additional ? additional : null)
    .concat(className)
    .filter(i => !!i)
    .join(' ');
};
