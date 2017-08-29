import React from 'react';
import Enum from '../../../utils/Enum';
import { getNextId } from '../../../utils/ElementIDCreator';

export const withCommonCallbacks = Wrapped => {
  return class HOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    _onMouseEnter(e) {
      console.log('HOC mouse OVER',e);
    }

    _onMouseLeave(e) {
      console.log('HOC mouse OUT');
    }

    _onMouseClick(e) {
      console.log('HOC mouse CLICK!');
    }

    _onChange(e) {
      console.log('HOC change',e);
    }

    _onFocus(e) {
      console.log('HOC focus', e);
    }
  
    _onBlur(e) {
      console.log('HOC blur', e);
    }

    render() {
      //onMouseEnter={(e) => this._onMouseEnter(e)}
      return (
        <Wrapped  cid={getNextId()} {...this.props} />
      );
    }
  };
};
