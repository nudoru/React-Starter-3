import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withBootStrap } from '../shared/bsHOC';

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
const BCardLink = styled.a.attrs({ className: 'card-link' })``;

export const Card = withBootStrap(BCard, 'card');
export const CardHeader = withBootStrap(BCardHeader, 'card-header');
export const CardFooter = withBootStrap(BCardFooter, 'card-footer');
export const CardBody = withBootStrap(BCardBody, 'card-body');
export const CardTitle = withBootStrap(BCardTitle, 'card-title');
export const CardSubTitle = withBootStrap(BCardSubTitle, 'card-subtitle');
export const CardText = withBootStrap(BCardText, 'card-text');
export const CardLink = withBootStrap(BCardLink, 'card-link');