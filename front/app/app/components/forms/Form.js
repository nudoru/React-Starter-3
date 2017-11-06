import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import {
  withBootStrap,
  buildClassName,
  bootStrapPropTypes
} from '../shared/BootStrapHOC';
import {joinClasses, omit} from '../shared/utils';
import {getNextId} from '../../utils/ElementIDCreator';
import {colorList, metrics, modularScale} from "../shared/Theme";

const defaultValidator = _ => true;
const noop             = _ => null;

// layout horizontal is form-inline class
export class Form extends React.PureComponent {

  static propTypes = {
    onFocus     : PropTypes.func,
    onBlur      : PropTypes.func,
    onChange    : PropTypes.func,
    onError     : PropTypes.func,
    onValidation: PropTypes.func,
    validator   : PropTypes.func,
    layout      : PropTypes.string,
    legend      : PropTypes.string
  };

  static defaultpropTypes = {
    onFocus     : noop,
    onBlur      : noop,
    onChange    : noop,
    onError     : noop,
    onValidation: noop,
    validator   : defaultValidator,
    layout      : 'vertical'
  };

  static childContextTypes = {
    handleFocus : PropTypes.func,
    handleBlur  : PropTypes.func,
    handleChange: PropTypes.func,
    validateFn  : PropTypes.func,
    isValid     : PropTypes.func,
    layout      : PropTypes.string
  };

  getChildContext() {
    return {
      handleFocus : this._handleFocus,
      handleBlur  : this._handleBlur,
      handleChange: this._handleChange,
      validateFn  : this.props.validator,
      layout      : this.props.layout
    };
  }

  _handleFocus = e => {
    // console.log('Form on Focus', e);
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  // TODO validation
  _handleBlur = e => {
    // console.log('Form on Blur', e);
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  // TODO validation
  _handleChange = e => {
    console.log('Form on Change', e);
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  // this.props.validateFn ? return this.props.validateFn(this.state) : true;
  _isValid = _ => {
    return true;
  };

  render() {
    const {children, className} = this.props;
    const layoutCls             = this.props.layout === 'horizontal' ? 'form-inline' : null;

    return <form
      className={joinClasses(layoutCls, className)}>{children}</form>;
  }

}

// BS adds -15px left/right margins
const formGroupHorizontalStyle = css`
  margin-right: 0;
  margin-left: 0;
`;

export class FormGroup extends React.Component {
  static propTypes    = {
    name: PropTypes.string
  };
  static defaultProps = {
    name: `formgroup_${getNextId()}`
  };

  static contextTypes = {
    layout: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {children:originalChildren, className, name, ...rest} = this.props;

    const children = React.Children.map(originalChildren, child => {
      return React.cloneElement(child, {
        name: name
      });
    });

    return <div
      className={joinClasses('form-group',
        (this.context.layout === 'horizontal' ? 'row' : null),
        (this.context.layout === 'horizontal' ? formGroupHorizontalStyle : null),
        className)}
      {...rest}
    >
      {children}
    </div>;
  }
}

// Needs to use sizes: lg and sm
// readonly style - for disabled?
// error style?
export class Field extends React.Component {

  static propTypes = {
    id          : PropTypes.string,
    name        : PropTypes.string,
    onFocus     : PropTypes.func,
    onBlur      : PropTypes.func,
    onChange    : PropTypes.func,
    onError     : PropTypes.func,
    required    : PropTypes.bool,
    disabled    : PropTypes.bool,
    error       : PropTypes.bool,
    sm          : PropTypes.bool,
    lg          : PropTypes.bool,
    layout      : PropTypes.string,
    label       : PropTypes.string,
    hint        : PropTypes.string,
    errorMsg    : PropTypes.string,
    defaultValue: PropTypes.string,
    value       : PropTypes.string,
    validator   : PropTypes.func
  };

  static defaultProps = {
    id       : `field_${getNextId()}`,
    validator: defaultValidator
  };

  static contextTypes = {
    handleFocus : PropTypes.func,
    handleBlur  : PropTypes.func,
    handleChange: PropTypes.func,
    validateFn  : PropTypes.func,
    layout      : PropTypes.string
  };

  _handleFocus = e => {
    // console.log('Field on Focus', e);
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
    this.context.handleFocus(e);
  };

  // TODO validation
  _handleBlur = e => {
    // console.log('Field on Blur', e);
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
    this.context.handleBlur(e);
  };

  // TODO validation
  _handleChange = e => {
    let val = this._getValue(e);
    // console.log('Field on Change', val);

    console.log('is valid?', this.props.validator(val));

    if (this.props.onChange) {
      this.props.onChange(val);
    }
    this.context.handleChange(val);
  };

  _getValue = e => e.target.value;

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {children, className, ...rest} = this.props;
    let baseClass                        = 'form-control';

    if (this.props.sm) {
      baseClass += '-sm';
    } else if (this.props.lg) {
      baseClass += '-lg';
    }

    // TODO pass omit an array and omit will handle it
    const cleanProps = omit({
      required : null,
      layout   : null,
      label    : null,
      hint     : null,
      errorMsg : null,
      validator: null,
      sm       : null,
      lg       : null
    }, rest);
    // console.log(this.props, 'field, props', cleanProps);
    return <input name={this.props.name || this.props.id}
                  className={joinClasses(baseClass, className)} {...cleanProps}
                  onChange={this._handleChange} onFocus={this._handleFocus}
                  onBlur={this._handleBlur}/>;
  }
}

const labelStyle = css`
  text-transform: uppercase;
  padding-right: ${modularScale.ms0};
`;

export const Label = ({name = '', className = null, children}) =>
  <label htmlFor={name}
         className={joinClasses(labelStyle, className)}>{children}</label>;


const hintStyle = css`
  margin-bottom: 0;
  color: ${colorList.grey8};
  padding-top:  ${modularScale['ms-2']};
`;

const hintHorizontalStyle = css`
  padding-left: ${modularScale['ms-2']};
  padding-top:  0;
`;


export class Hint extends React.Component {
  static contextTypes = {
    layout: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {children, className, ...rest} = this.props;

    return <p
      className={joinClasses('small', hintStyle, (this.context.layout === 'horizontal' ? hintHorizontalStyle : null), className)}
      {...rest}
    >
      {children}
    </p>;
  }
}