import React from 'react';
// import styled from 'styled-components';



export const ListGroup = ({ flush, children, className = '', ...rest }) => {
  // flush toggle
  let cls = ['list-group'];

  if (flush) {
    cls.push('list-group-flush');
  }

  cls.push(className);

  return (
    <ul className={cls.join(' ')} {...rest}>
      {children}
    </ul>
  );
};
export const ListGroupItem = ({ children, className = '', ...rest }) => {
  return (
    <li className={'list-group-item ' + className} {...rest}>
      {children}
    </li>
  );
};
