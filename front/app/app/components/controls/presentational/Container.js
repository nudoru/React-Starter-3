import React from 'react';
import { mergeClassNames } from '../shared/utils';

export const Container      = (props) => <div
  className={mergeClassNames('container', props.className)}>{props.children}</div>;

  export const ContainerFluid = (props) => <div
  className={mergeClassNames('container-fluid', props.className)}>{props.children}</div>;
