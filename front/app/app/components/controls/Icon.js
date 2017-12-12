import React from 'react';
import { css } from 'emotion';
import { darken } from 'polished';
import { buildClassName, withStyles } from '../shared/StyleManager';
import { getBSColorFromProps, joinClasses } from '../shared/utils';
import { shadows } from '../shared/Theme';

// These match button round sizes
const RoundXSmall  = 1.6;
const RoundSmall   = 2.8;
const RoundDefault = 4;
const RoundLarge   = 5.8;

const shapeStyle = size => css`
  position: relative;
  width: ${size}rem;
  height: ${size}rem;
  display: flex;
  justify-content: center;
  align-items: center;  
  overflow: hidden;
  border-radius: 50%;
  padding: 0;
  font-size: ${size / 2.5}rem;
`;

// Icons are shifted down/left this puts them back in the middle
// But text children aren't centered now
const innerStyle = css`
    position: relative;
    top: -.1em;
    left: -.05em;
`;

const getShapeStyle = props => {
  if (props.xs) {
    return shapeStyle(RoundXSmall);
  } else if (props.sm) {
    return shapeStyle(RoundSmall);
  } else if (props.lg) {
    return shapeStyle(RoundLarge);
  }
  return shapeStyle(RoundDefault);
};

//  background-color: ${color};

const colorFillStyle = color => css`
  background: linear-gradient(-45deg, ${color}, ${darken(0.1, color)});
  border: 1px solid ${color};
  color: #fff;
  text-shadow: ${shadows.textDark};
`;

const colorOutlineStyle = color => css`
  background-color: transparent;
  border: 1px solid ${color};
  color: ${darken(0.1, color)};
  text-shadow: ${shadows.textLight};
`;

const getColorStyle = props => {
  let color = getBSColorFromProps(props);

  if (props.outline) {
    return colorOutlineStyle(color);
  }
  return colorFillStyle(color);
};



class BIcon extends React.PureComponent {
  static propTypes    = {};
  static defaultProps = {};

  render () {
    return (
      <div
        className={joinClasses(getShapeStyle(this.props), getColorStyle(this.props), buildClassName(this.props))}>
        <span className={innerStyle}>{this.props.children}</span></div>
    );
  }
}

export const Icon = withStyles('')(BIcon);