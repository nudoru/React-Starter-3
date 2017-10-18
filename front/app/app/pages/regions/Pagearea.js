import React from 'react';
import { css } from 'emotion';
import { colorList } from '../../components/shared/ThemeData';
import { Container } from '../../components/controls/Container';

const componentStyle = css`
  position: relative;
  display: flex;
  background-color: ${colorList.grey0};
  flex: 1;
`;

export const Pagearea = ({children}) =>
  <div className={componentStyle}>
    <Container className='pt-2'>{children}</Container>
  </div>;