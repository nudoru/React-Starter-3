import React from 'react';
import Enum from '../../../utils/Enum';
import { getNextId } from '../../../utils/ElementIDCreator';

export const withCommonCallbacks = Wrapped => {
  return class HOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    _onMouseOver(e) {
      console.log('HOC mouse OVER',e);
    }

    _onMouseOut(e) {
      console.log('HOC mouse OUT');
    }

    _onMouseClick(e) {
      console.log('HOC mouse CLICK!');
    }

    _onChange(e) {
      console.log('HOC change',e);
    }

    render() {
      return (
        <Wrapped onMouseOver={(e) => this._onMouseOver(e)} {...this.props} />
      );
    }
  };
};
