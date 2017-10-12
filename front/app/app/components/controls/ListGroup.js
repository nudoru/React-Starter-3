import React from 'react';
import {css} from 'emotion';
import {joinClasses} from '../shared/utils';
import { withBootStrap, buildClassName } from '../shared/BootStrapHOC';

const containerStyle = css``;

const BListGroup = props => {
  return <ul className={joinClasses(buildClassName(props), containerStyle)}>{props.children}</ul>;
};

const componentStyle = css`
  margin-bottom: 0;
  border-width: 0;
  border-bottom-width: 1px;
  :last-of-type {
    border-bottom: none;
  }
`;

const BListGroupItem = props => {
  return <li className={joinClasses(buildClassName(props), componentStyle)}>{props.children}</li>;
};

export const ListGroup     = withBootStrap('list-group')(BListGroup);
export const ListGroupItem = withBootStrap('list-group-item')(BListGroupItem);
