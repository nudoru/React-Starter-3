import React from 'react';
import styled, {css} from 'react-emotion';
import {color, fontSize, space, width} from 'styled-system';
import {colorList, colors, metrics, modularScale} from "../../../theme/Theme";
// import { withBootStrap, createClassNameFromProps, styleComponentPropTypes } from '../shared/BootStrapHOC';
import {joinClasses} from '../../../utils/componentUtils';

// -- Define Theme -------------------------------------------------------------
// -- Define Theme -------------------------------------------------------------
// -- Define Theme -------------------------------------------------------------


// -- Redefine Elements and Globals --------------------------------------------
// -- Redefine Elements and Globals --------------------------------------------
// -- Redefine Elements and Globals --------------------------------------------



// CONTENT styles vs COMPONENT / CONTROL styles
// LG, default (m) and sm styles

//http://tachyons.io/#style

// -- Containers ---------------------------------------------------------------
// -- Containers ---------------------------------------------------------------
// -- Containers ---------------------------------------------------------------

// https://github.com/emotion-js/emotion/blob/gatsby/packages/site/src/components/Box.js
//https://github.com/emotion-js/emotion/blob/master/docs/styled.md

// Text column measures

// -- Parts --------------------------------------------------------------------
// -- Parts --------------------------------------------------------------------
// -- Parts --------------------------------------------------------------------

const componentHeaderColor = colorList.grey8;
const componentTextColor   = colorList.grey10;

export const ComponentH1 = styled('h1')`
  margin-bottom: ${metrics.baseSpacing * 0.25}rem;
  font-size: ${modularScale.ms3};
  color: ${componentHeaderColor};
`;

export const ComponentH2 = styled('h2')`
  margin-bottom: ${metrics.baseSpacing * 0.25}rem;
  font-size: ${modularScale.ms2};
  color: ${componentHeaderColor};
`;

export const ComponentH3 = styled('h3')`
  margin-bottom: ${metrics.baseSpacing * 0.25}rem;
  font-size: ${modularScale.ms1};
  color: ${componentHeaderColor};
`;

export const ComponentH4 = styled('h4')`
  margin-bottom: ${metrics.baseSpacing * 0.25}rem;
  font-size: ${modularScale.ms0};
  font-weight: 600;
  text-transform: uppercase;
  color: ${componentHeaderColor};
`;

export const ComponentH5 = styled('h5')`
  margin-bottom: ${metrics.baseSpacing * 0.25}rem;
  color: ${componentHeaderColor};
  font-size: ${modularScale.ms0};
  font-weight: 600;
`;

export const ComponentH6 = styled('h6')`
  margin-bottom: 0;
  color: ${componentHeaderColor};
  text-transform: uppercase;
  font-size: ${modularScale['ms-0']};
  font-weight: 600;
`;

export const ComponentText = styled('p')`
  color: ${componentTextColor};
  margin-bottom: ${metrics.baseSpacing * 0.5}rem;
  padding: 0;
  font-size: ${modularScale.ms0};
`;

export const ComponentLabel = (props) => <ComponentH5 {...props}/>;

// Shapes: box: button frame, card frame, input
// PANEL vs CARD? + popup / modal?
// In-component headers
// Labels
// Icons

// -- Shadows --------------------------------------------------------------------
// -- Gradients --------------------------------------------------------------------
// -- Hover --------------------------------------------------------------------
// grow or dim?


// Container for any 3d transforms
const threedwrapper = css`
  position: relative;
  perspective: 800px;
`;

// Base styles for any 3d transformed object
const threedel = css`
  transform-style: preserve-3d;
  transform-origin: 50% 50% 0;
`;

export class ThreeDWrapper extends React.PureComponent {
  render() {
    const {className, children, ...rest} = this.props;
    return <div
      className={joinClasses(threedwrapper, className)} {...rest}>{children}</div>;
  }
}

export class ThreeDEl extends React.PureComponent {
  render() {
    const {className, children, ...rest} = this.props;
    return <div
      className={joinClasses(threedel, className)} {...rest}>{children}</div>;
  }
}