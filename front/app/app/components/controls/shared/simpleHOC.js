import React from 'react';
import { ThemeProvider } from 'styled-components';
import RHUTheme from '../theme/rh';
import Enum from '../../../utils/Enum';
import { getNextId } from '../../../utils/ElementIDCreator';

export const withCommonCallbacks = Wrapped => {
  return class HOC extends React.Component {
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
  };
};
