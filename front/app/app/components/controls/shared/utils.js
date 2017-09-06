import { SIZE, SIZE_MAP, DEVICE_SIZES, STYLE, STATE } from './BsStyles';
import {
  ARIA_WIDGETS,
  ARIA_COMPOSITE_WIDGETS,
  ARIA_LANDMARK,
  ARIA_DOCUMENT
} from './Aria';

// bootstrap class -> aria role
export const bsAriaMap = {
  btn: ARIA_WIDGETS.button
};

export const removeEmpty = array => array.filter(i => !!i);

/* 
Big ol' block of imperative string mashup

Exceptions: btn btn-outline-[status]
*/

/* TODO
- Need a modifier for tabs: nav nav-tabs, pills, fill
*/
export const getBsClassName = (tag, props, others) => {
  let {
      className,
      bsClass, // alert, btn, badge, etc.
      bsSize, // sm, lg, md, xl
      bsModifier, // .block
      active, // .active
      disabled, // .disabled
      primary,
      secondary,
      success,
      danger,
      warning,
      info,
      light,
      dark
    } = props,
    cls = [className];

  if (bsClass) {
    cls.push(bsClass);
    cls.push(primary ? `${bsClass}-primary` : null);
    cls.push(secondary ? `${bsClass}-secondary` : null);
    cls.push(success ? `${bsClass}-success` : null);
    cls.push(danger ? `${bsClass}-danger` : null);
    cls.push(warning ? `${bsClass}-warning` : null);
    cls.push(info ? `${bsClass}-info` : null);
    cls.push(light ? `${bsClass}-light` : null);
    cls.push(dark ? `${bsClass}-dark` : null);
    cls.push(bsSize ? `${bsClass}-${bsSize}` : null);
  }

  cls.push(bsModifier ? bsModifier : null);
  cls.push(others ? others : null);
  cls.push(active ? 'active' : null);
  // Other el's need disabled bool attr on the node, not CSS
  cls.push(disabled ? 'disabled' : null);

  return removeEmpty(cls).join(' ');
};
