import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {StyledComponents} from '../components/mocks/styledcomponents'
import {TextStyles} from '../components/mocks/textstyles'


class Styles extends React.Component {
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
    return (<TextStyles/>);
  }
}

Styles.defaultProps = {};
Styles.propTypes = {};

const mapStateToProps = state => {
  return {
    config: state.config
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Styles);