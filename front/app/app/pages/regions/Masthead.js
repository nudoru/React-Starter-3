import React from 'react';
import { css } from 'emotion';
import { metrics } from '../../components/shared/ThemeData';
import { Container } from '../../components/controls/Container';

const componentStyle = css`
  position: relative;
  display: flex;
  background-color: #fff;
  padding-top: ${metrics.spacing};
  padding-bottom: ${metrics.spacing};
`;

export const Masthead = ({children}) =>
  <header className={componentStyle}>
    <Container>{children}</Container>
  </header>;