import React from 'react';
import styled from 'styled-components';
import { Container, ContainerFluid } from './Container';

// https://getbootstrap.com/docs/4.0/layout/grid/

export const Grid      = ({children, ...rest}) =>
  <Container {...rest}>{children}</Container>;
export const GridFluid = ({children, ...rest}) =>
  <ContainerFluid {...rest}>{children}</ContainerFluid>;
export const Row       = styled.div.attrs({className: 'row'})``;
export const RowNG     = styled.div.attrs({className: 'row no-gutters'})``;

export const ColBreak = styled.div.attrs({className: 'w-100'})``;

export const Col = ({size, width, className='', ...rest}) => {
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

  // TODO any reasons to use a styled component here?
  return (
    <div className={modifier.join('-') + ' ' + className} {...rest} />
  );
};
