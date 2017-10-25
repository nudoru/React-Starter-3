import React from 'react';
import { css } from 'emotion';
import { colorList } from '../shared/Theme';

const componentStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  background-color: ${colorList.grey0};
`;

export const Pagearea = ({children}) =>
  <main className={componentStyle}>
    {children}
  </main>;