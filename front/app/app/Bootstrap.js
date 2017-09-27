import React from 'react';
import { Either } from './utils/functional';
import App from './App';
import ErrorBoundary from './utils/ErrorBoundary';

// import { fetchConfigData } from './services/fetchConfig';

const LoadingMessage = () => <h1>Please wait ...</h1>;

const ErrorMessage = () => <h1>There was a problem loading the configuration.</h1>;


class Bootstrap extends React.Component {

  constructor () {
    super();
    this.state = {
      isLoading: false,  // Loading the config.json file
      isError  : false // Error loading the file?
    };
  }

  // On initial mounting of the component, load config or start app
  componentDidMount () {
    //this.fetchConfig();
  }

  // Start the app or load the configuration file
  // fetchConfig () {
  //   fetchConfigData().fork(e => {
  //       this.setState({isLoading: false, isError: true});
  //       console.error('Error loading config file: ', e);
  //     },
  //     config => {
  //       AppStore.dispatch(SetConfig(config));
  //       this.setState({isLoading: false});
  //     });
  // }

  render () {
    return Either
            .fromBool(this.state.isLoading)
            .fold(
              () => Either
                    .fromBool(this.state.isError)
                .fold(() => <ErrorBoundary><App/></ErrorBoundary>,
                      () => <ErrorMessage/>),
              () => <LoadingMessage/>);
  }
}

export default Bootstrap;