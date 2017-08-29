import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import RHUTheme from '../theme/rh';
import { getNextId } from '../../../utils/ElementIDCreator';

const ControlContainer = styled.div`
  margin: ${props => props.theme.metrics.spacing};
  padding: ${props => props.theme.metrics.spacing};
  background-color: ${props => props.theme.colorList.grey1};
  border: 1px solid ${props => props.theme.colorList.blue};
  border-radius: ${props => props.theme.metrics.borderRadiusSmall};
  width: 250px;
`;

class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Determine we're in a user or programmer controlled state as determined by passed props values
  // If controlled, use props. If not, use state
  // For changes, if controlled invoke onChange `callback to parent, else update state
  _isControlled() {
    if (this.props.activeIndex !== null || this.props.value !== null) {
      return true;
    }
    return false;
  }

  componentDidMount() {}

  _onMouseEnter(e) {
    e.preventDefault();
    console.log('mouse OVER', e);
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  }

  _onMouseLeave(e) {
    e.preventDefault();
    console.log('mouse OUT', e);
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  }

  _onClick(e) {
    e.preventDefault();
    console.log('mouse CLICK!', e);
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  _onFocus(e) {
    e.preventDefault();
    console.log('focus', e);
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  _onBlur(e) {
    e.preventDefault();
    console.log('blur', e);
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  _onChange(e) {
    e.preventDefault();
    console.log('change', e.target.value);
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  render() {
    return (
      <ThemeProvider theme={RHUTheme}>
        <ControlContainer>
          <p
            onMouseEnter={e => this._onMouseEnter(e)}
            onMouseLeave={e => this._onMouseLeave(e)}
            onClick={e => this._onClick(e)}
          >
            Foo! {this.props.cid}
          </p>
          <input
            onFocus={e => this._onFocus(e)}
            onBlur={e => this._onBlur(e)}
            onChange={e => this._onChange(e)}
            defaultValue="Whatever"
          />
        </ControlContainer>
      </ThemeProvider>
    );
  }
}

Foo.defaultProps = {};

// what would be defaultValue props
// what would trigger explicit controlled value props, and their change handlers?
Foo.propTypes = {
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  activeIndex: PropTypes.number,
  defaultActiveIndex: PropTypes.number
};

export default Foo;
