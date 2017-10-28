import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import { withBootStrap, buildClassName, bootStrapPropTypes } from '../shared/BootStrapHOC';
import {joinClasses, omit} from '../shared/utils';


const defaultValidator = _ => true;
const noop = _ => null;

export class Form extends React.PureComponent {
  static propTypes = {
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    onValidation: PropTypes.func,
    validator: PropTypes.func,
    layout: PropTypes.string
  };
  static defaultpropTypes = {
    onFocus: noop,
    onBlur: noop,
    onChange: noop,
    onError: noop,
    onValidation: noop,
    validator: defaultValidator,
    layout: 'vertical'
  };

  static childContextTypes = {
    handleFocus: PropTypes.func,
    handleBlur: PropTypes.func,
    handleChange: PropTypes.func,
    validateFn: PropTypes.func,
    isValid: PropTypes.func,
    layout: PropTypes.string
  };

  getChildContext() {
    return {
      handleFocus: this._handleFocus,
      handleBlur: this._handleBlur,
      handleChange: this._handleChange,
      validateFn: this.props.validator,
      layout: this.props.layout
    };
  }

  _handleFocus = e => {console.log('Form on Focus',e);};
  _handleBlur = e => {console.log('Form on Blur',e);};
  _handleChange = e => {console.log('Form on Change',e);};

  // this.props.validateFn ? return this.props.validateFn(this.state) : true;
  _isValid = _ => { return true; };

  render() {
    return <form>{this.props.children}</form>
  }

}

export class Field extends React.Component {
  static propTypes = {
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    layout: PropTypes.string
  };
  static defaultpropTypes = {};

  static contextTypes = {
    handleFocus: PropTypes.func,
    handleBlur: PropTypes.func,
    handleChange: PropTypes.func,
    validateFn: PropTypes.func,
    layout: PropTypes.string
  };

  _handleFocus = e => {console.log('Form on Focus',e);};
  _handleBlur = e => {console.log('Form on Blur',e);};
  _handleChange = e => {console.log('Form on Change',e);};

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return <input defaultValue='Field!'/>
  }

}