import React from 'react';
import { mergeClassNames } from '../shared/utils';
import { Container, ContainerFluid } from './Container';

export const Grid      = ({children, ...rest}) =>
  <Container {...rest}>{children}</Container>;
export const GridFluid = ({children, ...rest}) =>
  <ContainerFluid {...rest}>{children}</ContainerFluid>;

export const Row      = ({children, ...rest}) => <div
  className={mergeClassNames('row', rest.className)}>{children}</div>;
export const RowNG    = ({children, ...rest}) => <div
  className={mergeClassNames('row no-gutters', rest.className)}>{children}</div>;
export const ColBreak = ({children, ...rest}) => <div
  className='w-100'>{children}</div>;

export const Col = ({size, width, className = null, ...rest}) => {
  let modifier = ['col'];

  if (size && !width) {
    console.warn('<Col> needs a width if it has a size!');
  }
  if (size) {
    modifier.push(size);
  }
  if (width) {
    modifier.push(width);
  }

  return (
    <div className={mergeClassNames(modifier.join('-'), className)} {...rest} />
  );
};
