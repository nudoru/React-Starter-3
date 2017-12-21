import React from 'react';
import { css } from 'emotion';
import { colorList, metrics } from '../../theme/Theme';
import { Container } from '../controls/containers/Container';

const componentStyle = css`
  position: relative;
  display: flex;
  background-color: ${colorList.grey8};
  padding-top: ${metrics.spacing[3]}rem;
  padding-bottom: ${metrics.spacing[3]}rem;
  color: #fff !important;
`;

export const Footer = ({children}) =>
  <footer className={componentStyle}>
    <Container>{children}</Container>
  </footer>;