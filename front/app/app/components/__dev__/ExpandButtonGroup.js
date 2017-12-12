import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, buildClassName } from '../shared/StyleManager';


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
    return (
      <div className={getBsClassName(this.props)}>Template component</div>
    );
  }
}

export const ExpandButtonGroup =  withStyles('')(BExpandButtonGroup);

class BToggleButton extends React.PureComponent {
  render() {
    return (
      <div className={getBsClassName(this.props)}>Template component</div>
    );
  }
}

export const ToggleButton =  withStyles('')(BToggleButton);