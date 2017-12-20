import React from 'react';
import { css } from 'emotion';

const componentStyle = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ApplicationContainer = ({children}) =>
  <div className={componentStyle}>
    {children}
  </div>;