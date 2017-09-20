import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withBootStrap, generateClassName } from '../shared/BootStrapHOC';


/**
 <ExpandButtonGroup>
  <ToggleButton>Click Me</ToggleButton> // If first, buttons on right, last on left
  <ButtonGroup>                         // hide / show, open / closed?
    <Button primary>Option 1</Button>
    <Button>Option 2</Button>
  </ButtonGroup>
 </ExpandButtonGroup>
 */

class BExpandButtonGroup extends React.PureComponent {
  render() {
    const El = styled.div.attrs({className:getBsClassName(this.props)})``;

    return (
      <El>Template component</El>
    );
  }
}

export const ExpandButtonGroup =  withBootStrap('')(BExpandButtonGroup);

class BToggleButton extends React.PureComponent {
  render() {
    const El = styled.div.attrs({className:getBsClassName(this.props)})``;

    return (
      <El>Template component</El>
    );
  }
}

export const ToggleButton =  withBootStrap('')(BToggleButton);