import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import RHUTheme from '../theme/rh';
import Enum from '../../../utils/Enum';
import { getNextId } from '../../../utils/ElementIDCreator';

export const withBootStrap = (Wrapped, bsClass='') => {
   class HOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <ThemeProvider theme={RHUTheme}>
          <Wrapped cid={getNextId()} {...this.props} />
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
    ariaRole: PropTypes.string, // Aria
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

  return HOC;
};
