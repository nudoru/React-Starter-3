import React from 'react';
import { joinClasses } from '../../../utils/componentUtils';
import { Container, ContainerFluid } from './Container';

export const Grid      = ({children, ...rest}) =>
  <Container {...rest}>{children}</Container>;
export const GridFluid = ({children, ...rest}) =>
  <ContainerFluid {...rest}>{children}</ContainerFluid>;

export const Row      = ({children, ...rest}) => <div
  className={joinClasses('row', rest.className)}>{children}</div>;
export const RowNG    = ({children, ...rest}) => <div
  className={joinClasses('row no-gutters', rest.className)}>{children}</div>;
export const ColBreak = ({children, ...rest}) => <div
  className='w-100'>{children}</div>;

export const Col = ({size, width, className = null, ...rest}) => {
  let modifier = ['col'];

  if (size && !width) {
    console.warn('<Col> requires a width if it has a size!');
  }
  if (size) {
    modifier.push(size);
  }
  if (width) {
    modifier.push(width);
  }

  return (
    <div className={joinClasses(modifier.join('-'), className)} {...rest} />
  );
};


// Convenience component, wraps all children in a <Col> component
export class RowAuto extends React.PureComponent {

  render() {
    const {children:originalChildren, className, ...rest} = this.props;

    const children = React.Children.map(originalChildren, (child) => {
      return <Col>{React.cloneElement(child)}</Col>;
    });

    return (
      <div className={joinClasses('row', className)} {...rest}>{children}</div>
    );
  }
}