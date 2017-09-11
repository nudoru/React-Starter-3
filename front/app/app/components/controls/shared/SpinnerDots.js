// http://tobiasahlin.com/spinkit/

import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

export const SpinnerDots = ({size = 10, marginTop = 0, color = 'rgb(90, 90, 90)'}) => {
  const padding = size / 2;
  const width   = size * 3 + padding * 2;

  const bounceDelay = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
    opacity: 0;
  } 40% { 
    transform: scale(1.0);
    opacity: 1;
  }
  `;

  const Spinner      = styled.div`
      margin: ${marginTop}px auto 0;
      width: ${width}px;
      text-align: center;
    `;
  const SpinnerChild = styled.div`
    width: ${size}px;
    height: ${size}px;
    background-color: ${color};
    border-radius: 100%;
    display: inline-block;
    animation: ${bounceDelay} 1.4s infinite ease-in-out both;
    &:not(:last-child) {
      margin-right: ${padding}px;
    }
  `;
  const Bounce1      = SpinnerChild.extend`
    animation-delay: -0.32s;
  `;
  const Bounce2      = SpinnerChild.extend`
    animation-delay: -0.16s;
  `;
  const Bounce3      = SpinnerChild.extend``;

  return (
    <Spinner>
      <Bounce1/>
      <Bounce2/>
      <Bounce3/>
    </Spinner>);
};