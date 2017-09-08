import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withBootStrap } from '../shared/bsHOC';
import Link from '../interactive/Link';

// Theme passed via HOC Wrapper

const BCard = styled.div.attrs({ className: 'card' })`
  background-color: ${props => props.theme.colorList.blue};
  width: ${props => props.width ? props.width : props.theme.cards.defaultWidth}
`;
const BCardHeader = styled.div.attrs({className:'card-header'})``;
const BCardFooter = styled.div.attrs({className:'card-footer'})``;
const BCardBody = styled.div.attrs({ className: 'card-body' })`
  padding: ${props => props.theme.metrics.spacing};
`;
const BCardTitle = styled.h4.attrs({ className: 'card-title' })``;
const BCardSubTitle = styled.h6.attrs({ className: 'card-subtitle mb-2 text-muted' })``;
const BCardText = styled.p.attrs({ className: 'card-text' })``;

// TODO replace with Link
// const BCardLink = styled.a.attrs({ className: 'card-link' })``;
const BCardLink = ({children, ...rest}) => <Link className='card-link' {...rest}>{children}</Link>;

export const Card = withBootStrap('card')(BCard);
export const CardHeader = withBootStrap('card-header')(BCardHeader);
export const CardFooter = withBootStrap('card-footer')(BCardFooter);
export const CardBody = withBootStrap('card-body')(BCardBody);
export const CardTitle = withBootStrap('card-title')(BCardTitle);
export const CardSubTitle = withBootStrap('card-subtitle')(BCardSubTitle);
export const CardText = withBootStrap('card-text')(BCardText);
export const CardLink = withBootStrap('card-link')(BCardLink);