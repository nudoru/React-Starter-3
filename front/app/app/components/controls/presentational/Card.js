import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withBootStrap, generateClassName } from '../shared/BootStrapHOC';
import Link from '../interactive/Link';

// Theme passed via Loading Wrapper

const BCard = props => {
  const El = styled.div.attrs({className: generateClassName(props)})`
  width: ${props => props.width ? props.width : props.theme.cards.defaultWidth}
  `;
  return <El {...props} />;
};

const BCardHeader = props => {
  const El = styled.div.attrs({className: generateClassName(props)})``;
  return <El {...props} />;
};

const BCardFooter = props => {
  const El = styled.div.attrs({className: generateClassName(props)})``;
  return <El {...props} />;
};

const BCardBody = props => {
  const El = styled.div.attrs({className: 'card-body'})`
  padding: ${props => props.theme.metrics.spacing};`;
  return <El {...props} />;
};

const BCardTitle = props => {
  const El = styled.h4.attrs({className: 'card-title'})``;
  return <El {...props} />;
};

const BCardSubTitle = props => {
  const El = styled.h6.attrs({className: 'card-subtitle mb-2 text-muted'})``;
  return <El {...props} />;
};

const BCardText = props => {
  const El = styled.p.attrs({className: 'card-text'})``;
  return <El {...props} />;
};

export const CardLink = ({className = '', ...rest}) => {
  return <Link className={`card-link ${className}`} {...rest}/>;
};

export const Card         = withBootStrap('card')(BCard);
export const CardHeader   = withBootStrap('card-header')(BCardHeader);
export const CardFooter   = withBootStrap('card-footer')(BCardFooter);
export const CardBody     = withBootStrap('card-body')(BCardBody);
export const CardTitle    = withBootStrap('card-title')(BCardTitle);
export const CardSubTitle = withBootStrap('card-subtitle')(BCardSubTitle);
export const CardText     = withBootStrap('card-text')(BCardText);
