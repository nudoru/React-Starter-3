import React from 'react';
import { Either } from './utils/functional';
import { resetId } from './utils/ElementIDCreator';
import { AppRouter } from './config/AppRouter';

import {
  getState, getStatePath, setState, listen,
  setStatePath
} from './store/Store';

const LoadingMessage = () => <h1>Reticulating splines ...</h1>;

class App extends React.Component {

  constructor () {
    super();
    this.state = {isReady: true};
  }

  componentDidMount () {
    console.log('Testing state ...');

    setState({a:1, b:2, c:{d:3}});

    let unsub = listen(s => {
      console.log('111 State change',s);
    });
    let unsub2 = listen(s => {
      console.log('222 State change',s);
    });


    setState({a:3, c:{d:4, e:[5,6,7]}});

    unsub();

    setStatePath('c.d',42);

    setState({c:{e:[8,9,{foo:'bar'}]}});
    setState({c:{e:[8,9,{foo:'bar'}]}});

    console.log(getStatePath('c.e'))

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