import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import RHUTheme from '../theme/rh';

const BaseViewDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  color: #999;
  background-color: #ddd;
  border: 1px solid #999;
  text-align: center;
`;

const LoadingViewDiv = BaseViewDiv.extend`
border-color: #0f0;`;
const PendingViewDiv = BaseViewDiv.extend`
border-color: #00f;
`;
const ErrorViewDiv   = BaseViewDiv.extend`
border-color: #f00;
`;

const LoadingView = () => <LoadingViewDiv><h1>Loading ...</h1></LoadingViewDiv>;
const PendingView = () => <PendingViewDiv><h1>Please Wait ...</h1>
</PendingViewDiv>;
const ErrorView   = () => <ErrorViewDiv><h1>Oops! An error!</h1></ErrorViewDiv>;

export const withLoading = Comp => {
  class Loading extends Component {

    static WrappedComponent = Comp;

    render () {
      const {loading, pending, error, loadingClass, pendingClass, errorClass} = this.props;
      let returnedComp,
            cls                                                               = [this.props.className || null];

      if (loading) {
        if (loadingClass) {
          cls.push(loadingClass);
        }
        returnedComp = <LoadingView className={cls.join(' ')}/>;
      } else if (pending) {
        if (pendingClass) {
          cls.push(pendingClass);
        }
        returnedComp = <PendingView className={cls.join(' ')}/>;
      } else if (error) {
        if (errorClass) {
          cls.push(errorClass);
        }
        returnedComp = <ErrorView className={cls.join(' ')}/>;
      } else {
        returnedComp = <Comp {...this.props} />;
      }

      return returnedComp;
    }
  }

  Loading.defaultProps = {
    loading: false,
    pending: false,
    error  : false
  };

  Loading.propTypes = {
    loading     : PropTypes.bool,
    pending     : PropTypes.bool,
    error       : PropTypes.bool,
    loadingClass: PropTypes.string,
    pendingClass: PropTypes.string,
    errorClass  : PropTypes.string
  };

  hoistNonReactStatic(Loading, Comp);

  return Loading;
};