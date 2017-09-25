import React from 'react';
import { mergeClassNames, cleanProps } from '../shared/utils';
import { withBootStrap, generateClassName,bootStrapPropTypes } from '../shared/BootStrapHOC';
import Link from '../interactive/Link';

// Theme passed via Loading Wrapper

const BCard = props => <div
  className={generateClassName(props)}>{props.children}</div>;

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

  return <Link className={mergeClassNames('card-link', className)} {...cleanedProps}/>;
};

export const Card         = withBootStrap('card')(BCard);
export const CardHeader   = withBootStrap('card-header')(BCardHeader);
export const CardFooter   = withBootStrap('card-footer')(BCardFooter);
export const CardBody     = withBootStrap('card-body')(BCardBody);
export const CardTitle    = withBootStrap('card-title')(BCardTitle);
export const CardSubTitle = withBootStrap('card-subtitle')(BCardSubTitle);
export const CardText     = withBootStrap('card-text')(BCardText);
