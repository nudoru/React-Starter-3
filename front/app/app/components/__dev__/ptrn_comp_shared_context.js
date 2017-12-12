import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import { withStyles, buildClassName, bootStrapPropTypes } from '../shared/StyleManager';
import {joinClasses, omit} from '../shared/utils';

const CONTEXT_NAME = '__form_context__';

export class Form extends React.PureComponent {
  static childContextTypes = {
    [CONTEXT_NAME]: PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      [CONTEXT_NAME]: this
    };
  }

  render() {
    return <form>{this.props.children}</form>
  }

}

export class Field extends React.Component {
  static contextTypes = {
    [CONTEXT_NAME]: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    // Put a reference to this component on the context so that it may be accessed
    // by the whole complex component
    context[CONTEXT_NAME].childClass = this;
  }

  componentWillUnmount() {
    //need to remove it from the context here
    if (this.context[CONTEXT_NAME].childClass === this) {
      this.context[CONTEXT_NAME].childClass = null;
    }
  }

  render() {
    return <input defaultValue='Field!'/>
  }

}
