import React from 'react';
import { css } from 'emotion';
import { colorList, metrics } from '../../components/shared/ThemeData';
import { Container } from '../../components/controls/Container';
import { joinClasses } from '../../components/shared/utils';

const componentStyle = css`
  position: relative;
  display: flex;
`;

const containerStyle = css`
  padding-top: ${metrics.spacing};
  padding-bottom: ${metrics.spacing};
`;

export const Module = ({className, children}) =>
  <article className={joinClasses(componentStyle, className)}>
    <Container className={containerStyle}>{children}</Container>
  </article>;