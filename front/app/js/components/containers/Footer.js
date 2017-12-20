import React from 'react';
import { css } from 'emotion';
import { colorList, metrics } from '../../theme/Theme';
import { Container } from '../controls/containers/Container';

const componentStyle = css`
  position: relative;
  display: flex;
  background-color: ${colorList.grey8};
  padding-top: ${metrics.spacing};
  padding-bottom: ${metrics.spacing};
  color: #fff !important;
`;

export const Footer = ({children}) =>
  <footer className={componentStyle}>
    <Container>{children}</Container>
  </footer>;