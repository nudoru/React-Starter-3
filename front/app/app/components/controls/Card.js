import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { joinClasses, omit } from '../shared/utils';
import {
  colorList, metrics, shadows,
  transitions
} from '../shared/Theme';
import { flexBoxProps } from '../shared/FlexBoxProps';
import {
  withBootStrap,
  buildClassName,
  bootStrapPropTypes
} from '../shared/BootStrapHOC';
import Link from './Link';

const componentStyle = props => css`
  border: none;
  width: ${props.width};
  overflow: hidden;
  border-radius: ${metrics.borderRadiusSmall};
`;

const interactiveStyle = css`
  cursor: pointer;
  transition: border ${transitions.timing} ${transitions.timingFunction}, box-shadow 250ms;
  &:hover {
    box-shadow: inset 0 0 30px 5px rgba(0,0,0,0.05), ${shadows.dropShadow.m};
  }
`;

class BCard extends React.PureComponent {

  static defaultProps = {
    width: 'auto'
  };

  static propTypes = {
    width: PropTypes.string
  };

  render () {
    // Extracting className here so that styles are properly applied
    const {children, className, ...rest} = this.props;
    const cleanedProps                   = omit(bootStrapPropTypes, rest);

    return (
      <section
        className={joinClasses(buildClassName(this.props), componentStyle(this.props), (this.props.onClick ? interactiveStyle : null))} {...cleanedProps}>
        {children}
      </section>
    );
  }
}

// padding-top: ${metrics.baseSpacing}${metrics.baseSpacingUnit};
// padding-bottom: ${metrics.baseSpacing}${metrics.baseSpacingUnit};
// padding-left: ${metrics.baseSpacing * 1.5}${metrics.baseSpacingUnit};
// padding-right: ${metrics.baseSpacing * 1.5}${metrics.baseSpacingUnit};
const containerStyle = css`
    padding: ${metrics.spacing};
  `;

const headerStyle = css`
  border: none;
  background-color: rgba(0,0,0,0.05);
`;

const BCardHeader = props => {
  const {className, ...rest} = props;
  const cleanProps           = omit(bootStrapPropTypes, rest);
  return <div
    className={joinClasses(buildClassName(props), containerStyle, headerStyle)} {...cleanProps} />;
};

const footerStyle = css`
  text-align: center;
  border: none;
  background-color: rgba(0,0,0,0.05);
`;

const BCardFooter = props => <div
  className={joinClasses(buildClassName(props), containerStyle, footerStyle)}>{props.children}</div>;

const BCardBody = props => <section
  className={joinClasses(buildClassName(props), containerStyle)}>{props.children}</section>;

//  margin-bottom: ${metrics.baseSpacing}${metrics.baseSpacingUnit};
const titleStyle = css`
  color: ${colorList.grey10};
  margin-bottom: ${metrics.spacing};
`;


const BCardTitle = props => <h3
  className={joinClasses(buildClassName(props), titleStyle)}>{props.children}</h3>;

const subTitleStyle = css`
  color: ${colorList.grey8};
  line-height: 1.25rem;
`;

const BCardSubTitle = props => <p
  className={joinClasses(buildClassName(props), subTitleStyle)}>{props.children}</p>;

//margin-top: ${metrics.baseSpacing*2}${metrics.baseSpacingUnit};
const textStyle = css`
  margin-top: ${metrics.spacing};
`;

const BCardText = props => <p
  className={joinClasses(buildClassName(props), textStyle)}>{props.children}</p>;

export const CardLink = ({className, ...rest}) => {
  let cleanedProps = omit(bootStrapPropTypes, rest);

  return <Link
    className={joinClasses('card-link', className)} {...cleanedProps}/>;
};

export const Card         = withBootStrap('card')(BCard);
export const CardHeader   = withBootStrap('card-header')(BCardHeader);
export const CardFooter   = withBootStrap('card-footer')(BCardFooter);
export const CardBody     = withBootStrap('card-body')(BCardBody);
export const CardTitle    = withBootStrap('card-title')(BCardTitle);
export const CardSubTitle = withBootStrap('card-subtitle')(BCardSubTitle);
export const CardText     = withBootStrap('card-text')(BCardText);

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

export class CardXHeader extends React.PureComponent {

  static propTypes    = {
    height    : PropTypes.string,
    horizontal: PropTypes.string,
    vertical  : PropTypes.string,
    textColor : PropTypes.string
  };

  static defaultProps = {
    height    : 'auto',
    horizontal: flexBoxProps.center,
    vertical  : flexBoxProps.middle,
    textColor : '#fff'
  };

  render () {
    const {className, children, ...rest} = this.props;
    const cleanedProps                   = omit(CardXHeader.propTypes, rest);
    let componentStyle                   = css`
      height: ${this.props.height};
      display: flex;
      justify-content: ${flexBoxProps[this.props.horizontal]};
      align-items: ${flexBoxProps[this.props.vertical]};
      color: ${this.props.textColor};
    `;

    return (
      <div
        className={joinClasses(className, componentStyle)} {...cleanedProps}>{children}</div>
    );
  }
}

