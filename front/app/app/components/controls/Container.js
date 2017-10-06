import React from 'react';
import { joinClasses } from '../shared/utils';

export const Container      = (props) => <div
  className={joinClasses('container', props.className)}>{props.children}</div>;

  export const ContainerFluid = (props) => <div
  className={joinClasses('container-fluid', props.className)}>{props.children}</div>;
