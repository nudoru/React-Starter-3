import React, {Component} from 'react';
import {css} from 'emotion';
import hoistNonReactStatic from 'hoist-non-react-statics';
import PropTypes from 'prop-types';
import {metrics} from '../../../theme/Theme';
import {SpinnerDots} from '../SpinnerDots';

const LoadingView = ({message, ...rest}) => <div {...rest}><h6>{message}</h6>
  <SpinnerDots/></div>;
const PendingView = ({message, ...rest}) => <div {...rest}><h6>{message}</h6>
  <SpinnerDots/>
</div>;
const ErrorView   = ({message, ...rest}) => <div {...rest}><h6>{message}</h6>
</div>;

const componentStyle = css`
  width: 100%;
  height: 100%;
  padding: ${metrics.spacing};
  background: rgba(0, 0, 0, .05);
  text-align: center;
`;

export const withLoading = Comp => {
  class Loading extends Component {

    static defaultProps = {
      loading: false,
      pending: false,
      error  : false
    };

    static propTypes = {
      loading     : PropTypes.bool,
      pending     : PropTypes.bool,
      error       : PropTypes.bool,
      loadingClass: PropTypes.string,
      pendingClass: PropTypes.string,
      errorClass  : PropTypes.string,
      message     : PropTypes.string
    };

    static WrappedComponent = Comp;

    render() {
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
            cls = [componentStyle, (this.props.className || null)];

      if (loading) {
        if (loadingClass) {
          cls.push(loadingClass);
        }
        returnedComp = <LoadingView message={message || 'Loading ...'}
                                    className={cls.join(' ')}/>;
      } else if (pending) {
        if (pendingClass) {
          cls.push(pendingClass);
        }
        returnedComp = <PendingView message={message || 'Please wait ...'}
                                    className={cls.join(' ')}/>;
      } else if (error) {
        if (errorClass) {
          cls.push(errorClass);
        }
        returnedComp =
          <ErrorView message={message || 'Oh snap! We had an error.'}
                     className={cls.join(' ')}/>;
      } else {
        returnedComp = <Comp {...this.props} />;
      }

      return returnedComp;
    }
  }

  hoistNonReactStatic(Loading, Comp);

  return Loading;
};