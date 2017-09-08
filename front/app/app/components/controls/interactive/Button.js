import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withBootStrap } from '../shared/bsHOC';
import { getBsClassName } from '../shared/utils';

// TODO
// toggle
// Aria
// Support tags: a, input
class BButton extends React.PureComponent {
  render () {
    const {toggle} = this.props;
    let {type}     = this.props;

    type = type || 'button';

    const El = styled.button.attrs({className: getBsClassName(this.props)})``;

    return (
      <El type={type} role={this.props.ariaRole || 'button'}
        //data-toggle={toggle ? 'button' : ''}
        //aria-pressed={this.props.active}
          {...this.props}>{this.props.children}</El>
    );
  }
}

BButton.defaultProps = {};

BButton.propTypes = {
  outline: PropTypes.bool,
  lg     : PropTypes.bool,
  sm     : PropTypes.bool,
  block  : PropTypes.bool,
  toggle : PropTypes.bool
};

export default withBootStrap('btn')(BButton);