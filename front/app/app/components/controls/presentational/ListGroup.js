import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withBootStrap, generateClassName } from '../shared/bsHOC';

// TODO https://getbootstrap.com/docs/4.0/components/list-group/#links-and-buttons

const BListGroup = props => {
  const List = styled.ul.attrs({className: generateClassName(props)})``;
  return <List {...props}>{props.children}</List>;
};

const BListGroupItem = props => {
  let Item = styled.li.attrs({className: generateClassName(props)})``;
  return <Item {...props}>{props.children}</Item>;
};

export const ListGroup     = withBootStrap('list-group')(BListGroup);
export const ListGroupItem = withBootStrap('list-group-item')(BListGroupItem);
