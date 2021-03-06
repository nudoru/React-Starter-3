import React from 'react';
import {css} from 'emotion';
import {joinClasses} from '../../utils/componentUtils';
import { withStyles, createClassNameFromProps } from './common/StyleManager';

const containerStyle = css``;

const BListGroup = props => {
  return <ul className={joinClasses(createClassNameFromProps(props), containerStyle)}>{props.children}</ul>;
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
  return <li className={joinClasses(createClassNameFromProps(props), componentStyle)}>{props.children}</li>;
};

export const ListGroup     = withStyles('list-group')(BListGroup);
export const ListGroupItem = withStyles('list-group-item')(BListGroupItem);
