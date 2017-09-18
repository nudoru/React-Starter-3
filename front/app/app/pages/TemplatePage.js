import React from 'react';
import PropTypes from 'prop-types';

class TemplatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /*
  this.props.history
   - action, createHref, go, goBack, goForward, listen passed from React-Router
  this.props.location
    - hash, key, pathname, search passed from React-Router
  this.props.match
     - isExact, params, path, url passed from React-Router
   */
  componentDidMount() {
    console.log('Template page, ', this.props);
  }

  render() {
    return (<h1>Template Page</h1>);
  }
}

TemplatePage.defaultProps = {};
TemplatePage.propTypes = {};

export default TemplatePage;
