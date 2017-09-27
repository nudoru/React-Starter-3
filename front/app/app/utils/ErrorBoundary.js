// Ref impl from
// https://facebook.github.io/react/blog/2017/07/26/error-handling-in-react-16.html
// and this pen
// https://codepen.io/gaearon/pen/wqvxGa?editors=0010

import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props);
    this.state = {hasError: false, error: null, errorInfo: null};
  }

  componentDidCatch (error, info) {
    // Display fallback UI
    this.setState({
      hasError : true,
      error    : error,
      errorInfo: info
    });
    // You can also log the error to an error reporting service
    console.error('!! Error boundry', error, info);
  }

  render () {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (<div>
        <h4>Something went wrong.</h4>
        <hr/>
        <h6>Details</h6>
        {this.state.error && this.state.error.toString()}
        <br/>
        {this.state.info.componentStack}
      </div>);
    }
    return this.props.children;
  }
}