import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextStyles } from '../components/mocks/textstyles';
import { StyledComponents } from '../components/mocks/styledcomponents';

import Foo from '../components/controls/interactive/Foo';

import {  Card,
  CardBody,
  CardTitle,
  CardSubTitle,
  CardText,
  CardLink
} from '../components/controls/presentational/Card';

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
    return (
      <div>
        <Foo />
        <Card width="500px">
          <CardBody>
            <CardTitle>This is a card!</CardTitle>
            <CardSubTitle>Subtitles are cool</CardSubTitle>
            <CardText>Card! Card! Card! Card! </CardText>
            <CardLink href='http://www.google.com'>Link text</CardLink>
          </CardBody>
        </Card>
      </div>
    );
  }
}

TemplatePage.defaultProps = {};
TemplatePage.propTypes = {};

const mapStateToProps = state => {
  return {
    config: state.config
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplatePage);
