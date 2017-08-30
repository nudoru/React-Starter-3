import React from 'react';
import styled from 'styled-components';
import { withCommonCallbacks } from '../shared/simpleHOC';

const BListGroup = ({ flush, children, className = '', ...rest }) => {
  // flush toggle
  let cls = ['list-group'], List;

  if (flush) {
    cls.push('list-group-flush');
  }

  cls.push(className);

  List = styled.ul.attrs({ className: cls.join(' ') })``;

  return (
    <List {...rest}>
      {children}
    </List>
  );
};

const BListGroupItem = ({ children, className = '', ...rest }) => {
  let Item = styled.li.attrs({ className: 'list-group-item '+className })``;

  return (
    <Item {...rest}>
      {children}
    </Item>
  );
};

export const ListGroup = withCommonCallbacks(BListGroup);
export const ListGroupItem = withCommonCallbacks(BListGroupItem);