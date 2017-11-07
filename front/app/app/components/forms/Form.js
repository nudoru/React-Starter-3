import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import {css} from 'emotion';
import {
  withBootStrap,
  buildClassName,
  bootStrapPropTypes
} from '../shared/BootStrapHOC';
import {joinClasses, omit} from '../shared/utils';
import {getNextId} from '../../utils/ElementIDCreator';
import {colorList, colors, metrics, modularScale} from "../shared/Theme";

const defaultValidator = _ => true;
const noop             = _ => null;

//-------------------------------------------------------------------------------------------------------------------------

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

  _handleBlur = e => {
    // console.log('Form on Blur', e);
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  // TODO validation
  _handleChange = e => {
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

//-------------------------------------------------------------------------------------------------------------------------

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
    const {children: originalChildren, className, name, ...rest} = this.props;

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

//-------------------------------------------------------------------------------------------------------------------------

const fieldErrorStyle = css`
  border-color: ${colors.danger} !important;
`;

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
    validator: defaultValidator,
    disabled : false,
    error    : false
  };

  static contextTypes = {
    handleFocus : PropTypes.func,
    handleBlur  : PropTypes.func,
    handleChange: PropTypes.func,
    validateFn  : PropTypes.func,
    layout      : PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
  }

  state = {inputError: false};

  _handleFocus = e => {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
    this.context.handleFocus(e);
  };

  _handleBlur = e => {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
    this.context.handleBlur(e);
  };

  _handleChange = e => {
    this._updateOnChange(this._getValue(e));
  };

  _updateOnChange = debounce(controlValue => {
    let validInput = this.props.validator(controlValue);
    this.setState((prevState, props) => ({inputError: !validInput}));

    if (this.props.onChange) {
      this.props.onChange(controlValue);
    }
    this.context.handleChange(controlValue);
  }, 100);

  _isError = _ => this.props.error || this.state.inputError;

  _getValue = e => e.target.value;


  render() {
    const {children, className, ...rest} = this.props;
    let sizeClass                        = 'form-control';

    if (this.props.sm) {
      sizeClass += '-sm';
    } else if (this.props.lg) {
      sizeClass += '-lg';
    }

    const cleanProps = omit([
      'required',
      'layout',
      'label',
      'hint',
      'errorMsg',
      'validator',
      'sm',
      'lg',
      'error'
    ], rest);

    return <input name={this.props.name || this.props.id}
                  className={joinClasses(
                    'form-control',
                    sizeClass,
                    (this._isError() ? fieldErrorStyle : null),
                    className)}
                  onChange={this._handleChange} onFocus={this._handleFocus}
                  onBlur={this._handleBlur}
                  ref={control => this.controlRef = control}
                  {...cleanProps}
    />;
  }
}


//-------------------------------------------------------------------------------------------------------------------------


const labelStyle = css`
  text-transform: uppercase;
  padding-right: ${modularScale.ms0};
`;

export const Label = ({name = '', className = null, children}) =>
  <label htmlFor={name}
         className={joinClasses(labelStyle, className)}>{children}</label>;


//-------------------------------------------------------------------------------------------------------------------------


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