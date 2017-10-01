import React from 'react';
import ReactDOM from 'react-dom';

export const NOOP = () => {
};

// Given props from a component, iterate over propTypes and matches in the props
// Create clean props that are safe to attach to DOM node
export const cleanProps = (propTypes, props) => {
  Object.keys(propTypes).forEach(p => {
    if (props.hasOwnProperty(p)) {
      delete props[p];
    }
  });
  return props;
};

export const getDOMElements = a => a.map(ReactDOM.findDOMNode); //eslint-disable-line react/no-find-dom-node

export const removeNulls = array => array.filter(i => !!i);

// Could do it this way too ... `btn-toolbar ${className}`
export const mergeClassNames = (cls, propsCls = null) => removeNulls([cls, propsCls]).join(' ');