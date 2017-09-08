import React from 'react';

export const ButtonToolBar = ({children, className='', ...rest}) =>
  <div role='toolbar' className={'btn-toolbar '+className} {...rest}>{children}</div>;


// TODO
// add btn-group-lg, sm
// stacked btn-group-vertical
// Nesting?
export const ButtonGroup = ({children, className='', ...rest}) =>
  <div role='group' className={'btn-group '+className} {...rest}>{children}</div>;