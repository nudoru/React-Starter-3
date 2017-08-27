import React from 'react';
import { connect } from 'react-redux';
import { Either } from './utils/functional';
import { resetId } from './utils/ElementIDCreator';
import { AppRouter } from './config/AppRouter';

const LoadingMessage = () => <h1>Reticulating splines ...</h1>;

class App extends React.Component {

  constructor () {
    super();
    this.state = {isReady: true};
    //this.storeListener;
  }

  componentDidMount () {
    //this.storeListener = AppStore.subscribe(() => console.log('Action'));
  }

  render () {
    resetId();

    return Either
      .fromBool(this.state.isReady)
      .fold(() => <LoadingMessage/>,
        () => <AppRouter config={this.props.config}/>);

    /* or the more traditional way ...
    if (this.state.isReady) {
      resetId();
      return <AppRouter config={this.props.config}/>;
    } else {
      return <LoadingMessage/>;
    }
    */
  }
}

App.propTypes = {};

const mapStateToProps = state => {
  return {
    config: state.config
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

/*
 const LoginPanelPrompt = () => <LoginPanel
 title="Please enter your Kerberos ID to continue."
 prompt="You must be connected to the corporate network or VPN to access."
 inputLabel="@redhat.com"
 buttonLabel="Continue"
 validateFn={this.validateLoginInput.bind(this)}
 processLoginFn={this.handleLogin.bind(this)}
 />;

 // For LoginPanel, validate user input
 validateLoginInput (str) {
 return validateInputStr(str);
 }

 // For LoginPanel, handle isLoading and validating the user ID
 handleLogin (userId, onSuccessFn, onErrorFn) {
 console.log('Login for ', userId);
 onSuccessFn();
 // onErrorFn();
 }
 */