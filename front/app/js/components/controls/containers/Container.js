import React from 'react';
import {css} from 'emotion';
import { modularScale } from '../../../theme/Theme';
import {joinClasses} from '../../../utils/componentUtils';

const componentStyle = css`
  display: block;
  padding-left: ${modularScale.ms0};
  padding-right: ${modularScale.ms0};
`;

export const Container = (props) => <div
  className={joinClasses('container', componentStyle, props.className)}>{props.children}</div>;

export const ContainerFluid = (props) => <div
  className={joinClasses('container-fluid', componentStyle, props.className)}>{props.children}</div>;
