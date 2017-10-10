import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import {joinClasses, omit} from '../shared/utils';
import {metrics} from '../shared/ThemeData';
import {flexBoxProps} from '../shared/FlexBoxProps';
import {
  withBootStrap,
  buildClassName,
  bootStrapPropTypes
} from '../shared/BootStrapHOC';
import Link from './Link';

class BCard extends React.PureComponent {

  static defaultProps = {
    width: 'auto'
  };

  static propTypes = {
    width: PropTypes.string
  };

  render() {
    const {children, ...rest} = this.props;
    const cleanedProps        = omit(bootStrapPropTypes, rest);
    const componentStyle      = css`
      width: ${this.props.width};
    `;

    return (
      <div
        className={joinClasses(buildClassName(this.props), componentStyle)} {...cleanedProps}>{children}</div>
    );
  }
}


const containerStyle = css`
    padding-left: ${metrics.spacing} !important;
    padding-right: ${metrics.spacing} !important;
  `;

const BCardHeader = props => <div
  className={joinClasses(buildClassName(props), containerStyle)}>{props.children}</div>;

const BCardFooter = props => <div
  className={joinClasses(buildClassName(props), containerStyle)}>{props.children}</div>;

const BCardBody = props => <div
  className={joinClasses(buildClassName(props), containerStyle)}>{props.children}</div>;

const BCardTitle = props => <h4
  className={buildClassName(props)}>{props.children}</h4>;

const BCardSubTitle = props => <h6
  className={joinClasses(buildClassName(props), 'mb-2', 'text-muted')}>{props.children}</h6>;

const BCardText = props => <p
  className={buildClassName(props)}>{props.children}</p>;

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

  static defaultProps = {
    height    : 'auto',
    horizontal: flexBoxProps.center,
    vertical  : flexBoxProps.middle,
    textColor : '#fff'
  };
  static propTypes    = {
    height    : PropTypes.string,
    horizontal: PropTypes.string,
    vertical  : PropTypes.string,
    textColor : PropTypes.string
  };

  render() {
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

