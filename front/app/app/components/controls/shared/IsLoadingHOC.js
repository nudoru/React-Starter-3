import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import PropTypes from 'prop-types';
import styled, { keyframes, ThemeProvider } from 'styled-components';
import RHUTheme from '../theme/rh';
import { SpinnerDots } from '../shared/SpinnerDots';

// d-flex justify-content-center align-items-center
const BaseViewDiv = styled.div.attrs({className: ''})`
  width: 100%;
  height: 100%;
  padding: 1rem;
  background: rgba(0,0,0,.05);
  text-align: center;
`;

const LoadingViewDiv = BaseViewDiv.extend``;
const PendingViewDiv = BaseViewDiv.extend``;
const ErrorViewDiv   = BaseViewDiv.extend``;

const LoadingView = ({message, ...rest}) => <LoadingViewDiv {...rest}><h6>{message}</h6>
  <SpinnerDots/></LoadingViewDiv>;
const PendingView = ({message, ...rest}) => <PendingViewDiv {...rest}><h6>{message}</h6><SpinnerDots/>
</PendingViewDiv>;
const ErrorView   = ({message, ...rest}) => <ErrorViewDiv {...rest}><h6>{message}</h6></ErrorViewDiv>;

export const withLoading = Comp => {
  class Loading extends Component {

    static WrappedComponent = Comp;

    render () {
      const {
              loading,
              pending,
              error,
              loadingClass,
              pendingClass,
              errorClass,
              message
            }   = this.props;
      let returnedComp,
            cls = [this.props.className || null];

      if (loading) {
        if (loadingClass) {
          cls.push(loadingClass);
        }
        returnedComp = <LoadingView message={message || 'Loading ...'} className={cls.join(' ')}/>;
      } else if (pending) {
        if (pendingClass) {
          cls.push(pendingClass);
        }
        returnedComp = <PendingView message={message || 'Please wait ...'} className={cls.join(' ')}/>;
      } else if (error) {
        if (errorClass) {
          cls.push(errorClass);
        }
        returnedComp = <ErrorView message={message || 'Oh snap! We had an error.'} className={cls.join(' ')}/>;
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
    errorClass  : PropTypes.string,
    message     : PropTypes.string
  };

  hoistNonReactStatic(Loading, Comp);

  return Loading;
};