import React from 'react';
import ReactDOM from 'react-dom';
import {curry, compose} from 'ramda';
import {colors} from '../theme/Theme';
import {cx} from 'emotion';

export const NOOP = () => {
};

// Given props from a component, iterate over propTypes and matches in the props
// Create clean props that are safe to attach to DOM node
export const omit = (excludeKeys, props) => {
  let keys = Array.isArray(excludeKeys) ? excludeKeys : Object.keys(excludeKeys);

  keys.forEach(p => {
    if (props.hasOwnProperty(p)) {
      delete props[p];
    }
  });
  return props;
};

export const getDOMElements = a => a.map(ReactDOM.findDOMNode); //eslint-disable-line react/no-find-dom-node

export const removeNulls    = array => array.filter(i => !!i);
export const joinStrings    = delim => arry => arry.join(delim);
export const joinWithSpaces = joinStrings(' ');

// export const joinClasses = (...classes) => compose(joinWithSpaces, removeNulls)([...classes]);
export const joinClasses = (...classes) => cx([...classes].reverse());

export const clamp = curry((min, max, val) => {
  if (val < min) {
    return min;
  }
  if (val > max) {
    return max;
  }
  return val;
});

export const clamp01 = clamp(0, 1);

export const getColorClassFromProps = props => {
  const colorskeys = ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'];
  const match      = Object.keys(props).filter(p => colorskeys.indexOf(p) >= 0)[0];
  return match ? colors[match] : colors.primary;
};