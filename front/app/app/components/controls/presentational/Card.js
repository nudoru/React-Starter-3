import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withCommonCallbacks } from '../shared/simpleHOC';

// Theme passed via HOC Wrapper

const BCard = styled.div.attrs({ className: 'card' })`
  background-color: ${props => props.theme.colorList.blue};
  width: ${props => props.width ? props.width : props.theme.cards.defaultWidth}
`;

const BCardBody = styled.div.attrs({ className: 'card-body' })`
  padding: ${props => props.theme.metrics.spacing};
`;

const BCardTitle = styled.h4.attrs({ className: 'card-title' })``;

const BCardSubTitle = styled.h6.attrs({ className: 'card-subtitle mb-2 text-muted' })``;

const BCardText = styled.p.attrs({ className: 'card-text' })``;

const BCardLink = styled.a.attrs({ className: 'card-link' })``;

export const Card = withCommonCallbacks(BCard);
export const CardBody = withCommonCallbacks(BCardBody);
export const CardTitle = withCommonCallbacks(BCardTitle);
export const CardSubTitle = withCommonCallbacks(BCardSubTitle);
export const CardText = withCommonCallbacks(BCardText);
export const CardLink = withCommonCallbacks(BCardLink);