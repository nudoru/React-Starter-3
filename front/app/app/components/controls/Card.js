import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { mergeClassNames, cleanProps } from '../shared/utils';
import {flexBoxProps} from '../shared/FlexBoxProps';
import {
  withBootStrap,
  generateClassName,
  bootStrapPropTypes
} from '../shared/BootStrapHOC';
import Link from './Link';

// Theme passed via Loading Wrapper

class BCard extends React.PureComponent {
  render () {
    const {children, ...rest} = this.props;
    const cleanedProps        = cleanProps(bootStrapPropTypes, rest);
    let custCss               = css`
      width: ${this.props.width};
    `;

    return (
      <div
        className={mergeClassNames(generateClassName(this.props), custCss)} {...cleanedProps}>{children}</div>
    );
  }
}

BCard.defaultProps = {
  width: 'auto'
};
BCard.propTypes    = {
  width: PropTypes.string
};

const BCardHeader = props => <div
  className={generateClassName(props)}>{props.children}</div>;

const BCardFooter = props => <div
  className={generateClassName(props)}>{props.children}</div>;

const BCardBody = props => <div
  className={generateClassName(props)}>{props.children}</div>;

const BCardTitle = props => <h4
  className={generateClassName(props)}>{props.children}</h4>;

const BCardSubTitle = props => <h6
  className={generateClassName(props)}>{props.children}</h6>;

const BCardText = props => <p
  className={generateClassName(props)}>{props.children}</p>;

export const CardLink = ({className, ...rest}) => {
  let cleanedProps = cleanProps(bootStrapPropTypes, rest);

  return <Link
    className={mergeClassNames('card-link', className)} {...cleanedProps}/>;
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
  render () {
    const {className, children, ...rest} = this.props;
    const cleanedProps                   = cleanProps(CardXHeader.propTypes, rest);
    let custCss                          = css`
      height: ${this.props.height};
      display: flex;
      justify-content: ${flexBoxProps[this.props.horizontal]};
      align-items: ${flexBoxProps[this.props.vertical]};
      color: ${this.props.textColor};
    `;

    return (
      <div
        className={mergeClassNames(className, custCss)} {...cleanedProps}>{children}</div>
    );
  }
}

CardXHeader.defaultProps = {
  height: 'auto',
  horizontal: flexBoxProps.center,
  vertical: flexBoxProps.middle,
  textColor: '#fff'
};
CardXHeader.propTypes    = {
  height: PropTypes.string,
  horizontal: PropTypes.string,
  vertical: PropTypes.string,
  textColor: PropTypes.string
};