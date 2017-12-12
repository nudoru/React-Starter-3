import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import {css} from 'emotion';
import {
  withStyles,
  buildClassName,
  bootStrapPropTypes
} from '../shared/StyleManager';
import {joinClasses, omit} from '../shared/utils';
import {getNextId} from '../../utils/ElementIDCreator';
import {colorList, colors, modularScale} from "../shared/Theme";

const defaultValidator = _ => true;
const noop             = _ => null;





/*

Components vs props ... ?

add on at the front vs end? leading/training

<Input>
  <Label>Email address</Label>
  <Hint>What's your email address</Hint>
  <Error>Doesn't appear to be an email address...</Error>
  <FAddOnGroup>
    <AddOn>@</AddOn> // front
    <AddOnButton>Go</AddOnButton>
  </FAddOnGroup>
  <RAddOnGroup>
    <AddOn>.com</AddOn> // front
    <AddOnButton>Submit</AddOnButton>
  </RAddOnGroup>
</Input>

<div class="form-group">
  <label for="exampleFormControlInput1">Email address</label>
  <div class="input-group">
    <span class="input-group-addon" id="basic-addon1">@</span>
    <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
  </div>
  <span class="input-group-btn">
    <button class="btn btn-secondary" type="button">Go!</button>
  </span>
</div>





Bootstrap docs ...

Textual form controls—like <input>s, <select>s, and <textarea>s—are styled with the .form-control

<div class="form-group">
  <label for="exampleFormControlInput1">Email address</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
</div>

//input-group-lg
<div class="input-group">
  <span class="input-group-addon" id="basic-addon1">@</span>
  <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
</div>

<div class="input-group">
  <input type="text" class="form-control" placeholder="Search for..." aria-label="Search for...">
  <span class="input-group-btn">
    <button class="btn btn-secondary" type="button">Go!</button>
  </span>
</div>


<div class="form-group">
  <label for="exampleFormControlSelect1">Example select</label>
  <select class="form-control" id="exampleFormControlSelect1">
    <option>1</option>
    <option>2</option>
    <option>3</option>
  </select>
</div>


<div class="form-group">
  <label for="exampleFormControlSelect2">Example multiple select</label>
  <select multiple class="custom-select form-control" id="exampleFormControlSelect2">
    <option>1</option>
    <option>2</option>
    <option>3</option>
  </select>
</div>


<div class="form-group">
  <label for="exampleFormControlTextarea1">Example textarea</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>

Default checkboxes and radios are improved upon with the help of .form-check

Group checkboxes or radios on the same horizontal row by adding .form-check-inline to any

Each checkbox and radio is wrapped in a <label> for three reasons:
  It provides a larger hit areas for checking the control.
  It provides a helpful and semantic wrapper to help us replace the default <input>s.
  It triggers the state of the <input> automatically, meaning no JavaScript is required.


<div class="form-check">
  <label class="form-check-label">
    <input class="form-check-input" type="checkbox" value="">
    Option one is this and that&mdash;be sure to include why it's great
  </label>
</div>




<div class="form-check">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
    Option one is this and that&mdash;be sure to include why it's great
  </label>
</div>
<div class="form-check">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
    Option two can be something else and selecting it will deselect option one
  </label>
</div>
<div class="form-check disabled">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" disabled>
    Option three is disabled
  </label>
</div>
*/





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
  margin-bottom: ${modularScale.ms1};
  width: 100%;
`;

export class FormGroup extends React.Component {
  static propTypes    = {
    name: PropTypes.string,
    layout: PropTypes.string
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

    const isHorizontal = this.props.layout === 'horizontal' || this.context.layout === 'horizontal';

    const cleanProps = omit([
      'layout'
    ], rest);

    return <div
      className={joinClasses('form-group',
        (isHorizontal ? 'row' : null),
        (isHorizontal ? formGroupHorizontalStyle : null),
        className)}
      {...cleanProps}
    >
      {children}
    </div>;
  }
}

//-------------------------------------------------------------------------------------------------------------------------


// readonly style - for disabled?
// error style?
export class Field extends React.Component {

  static propTypes = {
    component   : PropTypes.object.isRequired,
    type        : PropTypes.string.isRequired,
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
    const {component, children, className, ...rest} = this.props;
    let sizeClass                                   = 'form-control';

    console.log('Field component is a', component.type)

    if (this.props.sm) {
      sizeClass += '-sm';
    } else if (this.props.lg) {
      sizeClass += '-lg';
    }

    const fieldClass = joinClasses(
      'form-control',
      sizeClass,
      (this._isError() ? 'is-invalid' : null),
      className);

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

    return React.cloneElement(component, {
      name     : this.props.name || this.props.id,
      className: fieldClass,
      onChange : this._handleChange,
      onFocus  : this._handleFocus,
      onBlur   : this._handleBlur,
      ref      : control => this.controlRef = control,
      children,
      ...cleanProps
    });
  }
}

export const Input = props => <Field component={<input/>} type='text' {...props}/>
export const CheckBox = props => <Field component={<input/>} type='checkbox' {...props}/>

//-------------------------------------------------------------------------------------------------------------------------

// will this work for check and radio groups?
export class FieldGroup extends React.PureComponent {
  static propTypes    = {
    component: PropTypes.object.isRequired,
    name     : PropTypes.string
  };
  static defaultProps = {
    name: `fieldgroup_${getNextId()}`
  };

  render() {
    const {component, children: originalChildren, ...rest} = this.props;

    const children = React.Children.map(originalChildren, child => {
      return React.cloneElement(child, {
        name: name
      });
    });

    return React.cloneElement(component, {
      name: this.props.name,
      children,
      ...rest
    });
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
      className={joinClasses('small', 'form-text', hintStyle, (this.context.layout === 'horizontal' ? hintHorizontalStyle : null), className)}
      {...rest}
    >
      {children}
    </p>;
  }
}

//-------------------------------------------------------------------------------------------------------------------------

export const Error = (props) =>
  <div className='invalid-feedback'>{props.children}</div> ;

//-------------------------------------------------------------------------------------------------------------------------

/*

<Input>
  <Label>Email address</Label>
  <Hint>What's your email address</Hint>
  <Error>Doesn't appear to be an email address...</Error>
  <FAddOnGroup>
    <AddOn>@</AddOn> // front
    <AddOnButton>Go</AddOnButton>
  </FAddOnGroup>
  <RAddOnGroup>
    <AddOn>.com</AddOn> // front
    <AddOnButton>Submit</AddOnButton>
  </RAddOnGroup>
</Input>


<div class="input-group">
    <span class="input-group-addon" id="basic-addon1">@</span>
    <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
  </div>
  <span class="input-group-btn">
    <button class="btn btn-secondary" type="button">Go!</button>
  </span>
 */


//-------------------------------------------------------------------------------------------------------------------------


