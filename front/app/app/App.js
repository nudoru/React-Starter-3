import React from 'react';
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

export default App;