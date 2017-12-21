import React from 'react';
import { css } from 'emotion';
import { metrics } from '../../theme/Theme';
import { Container } from '../controls/containers/Container';

const componentStyle = css`
  position: relative;
  display: flex;
  background-color: #fff;
  padding-top: ${metrics.spacing[3]}rem;
  padding-bottom: ${metrics.spacing[3]}rem;
`;

export const Masthead = ({children}) =>
  <header className={componentStyle}>
    <Container>{children}</Container>
  </header>;