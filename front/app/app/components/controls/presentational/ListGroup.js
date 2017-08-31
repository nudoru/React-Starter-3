import React from 'react';
import styled from 'styled-components';
import { withCommonCallbacks } from '../shared/simpleHOC';

const BListGroup = ({ flush, children, className = '', ...rest }) => {
  let cls = ['list-group'], List, nChildren;
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

// TODO additional styles https://getbootstrap.com/docs/4.0/components/list-group/
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