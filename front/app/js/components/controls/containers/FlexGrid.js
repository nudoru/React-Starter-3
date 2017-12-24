import React from 'react';
import { joinClasses } from '../../../utils/componentUtils';
import { Container, ContainerFluid } from './Container';

export const FlexGrid      = ({children, ...rest}) =>
  <Container {...rest}>{children}</Container>;
export const FlexGridFluid = ({children, ...rest}) =>
  <ContainerFluid {...rest}>{children}</ContainerFluid>;

export const FlexRow      = ({children, ...rest}) => <div
  className={joinClasses('row', rest.className)}>{children}</div>;
export const FlexRowNG    = ({children, ...rest}) => <div
  className={joinClasses('row no-gutters', rest.className)}>{children}</div>;
export const FlexColBreak = ({children, ...rest}) => <div
  className='w-100'>{children}</div>;

export const FlexCol = ({size, width, className = null, ...rest}) => {
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
export class FlexRowAuto extends React.PureComponent {

  render() {
    const {children:originalChildren, className, ...rest} = this.props;

    const children = React.Children.map(originalChildren, (child) => {
      return <FlexCol>{React.cloneElement(child)}</FlexCol>;
    });

    return (
      <div className={joinClasses('row', className)} {...rest}>{children}</div>
    );
  }
}