import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import RHUTheme from '../theme/rh';
import Enum from '../../../utils/Enum';
import { getNextId } from '../../../utils/ElementIDCreator';

// bsClass -> BootStrap CSS control class, btn, badge, etc.
export const withBootStrap = (bsClass = '') => Comp => {
  class HOC extends Component {
    
    static WrappedComponent = Comp;

    render() {
      return (
        <ThemeProvider theme={RHUTheme}>
          <Comp cid={getNextId()} {...this.props} />
        </ThemeProvider>
      );
    }
  }

  HOC.defaultProps = {
    bsClass: bsClass,
    active: false,
    disabled: false
  };

  HOC.propTypes = {
    bsClass: PropTypes.string, // btn
    bsSize: PropTypes.string, // sm
    bsModifier: PropTypes.string, // block
    ariaRole: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    success: PropTypes.bool,
    danger: PropTypes.bool,
    warning: PropTypes.bool,
    info: PropTypes.bool,
    light: PropTypes.bool,
    dark: PropTypes.bool
  };

  hoistNonReactStatic(HOC, Comp);

  return HOC;
};
