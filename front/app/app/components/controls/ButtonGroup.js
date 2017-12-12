import React from 'react';
import {joinClasses} from '../shared/utils';
import { withStyles, buildClassName } from '../shared/StyleManager';

export const ButtonToolBar = ({className, children}) =>
  <div role='toolbar' className={joinClasses('btn-toolbar',className)}>{children}</div>;

// TODO Note, sm and lg don't appear correctly when inside of a toolbar
const BButtonGroup = ({children, ... rest}) => {
  return <div role='group' className={buildClassName(rest)}>{children}</div>;
};

export const ButtonGroup = withStyles('btn-group')(BButtonGroup);
