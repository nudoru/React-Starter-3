import React from 'react';
import { withBootStrap, buildClassName } from '../shared/BootStrapHOC';

// TODO https://getbootstrap.com/docs/4.0/components/list-group/#links-and-buttons

const BListGroup = props => {
  return <ul className={buildClassName(props)}>{props.children}</ul>;
};

const BListGroupItem = props => {
  return <li className={buildClassName(props)}>{props.children}</li>;
};

export const ListGroup     = withBootStrap('list-group')(BListGroup);
export const ListGroupItem = withBootStrap('list-group-item')(BListGroupItem);
