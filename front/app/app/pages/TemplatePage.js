import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import {
  Module, ModuleContainer,
  ModuleTitle
} from '../components/containers/Module';
import { styles } from '../components/shared/Theme';

export default class TemplatePage extends React.PureComponent {
  static propTypes = {};
  static defaultProps = {};

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

  render () {
    return <ModuleContainer>
      <Module full>
        <ModuleTitle>Template page</ModuleTitle>

      </Module>
    </ModuleContainer>;
  }
}