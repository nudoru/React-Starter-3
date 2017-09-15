import React from 'react';
import styled from 'styled-components';
import { withBootStrap, generateClassName } from '../shared/BootStrapHOC';

export const ButtonToolBar = ({className='', ...rest}) =>
  <div role='toolbar' className={`btn-toolbar ${className}`} {...rest} />;

// TODO
// stacked btn-group-vertical
// Nesting?
// Note, sm and lg don't appear correctly when inside of a toolbar
const BButtonGroup = (props) => {
  const El = styled.div.attrs({className: generateClassName(props)})``;
  return <El role='group'/>;
};

export const ButtonGroup = withBootStrap('btn-group')(BButtonGroup);
