import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextStyles } from '../components/mocks/textstyles';
import { StyledComponents } from '../components/mocks/styledcomponents';

import Foo from '../components/controls/interactive/Foo';

import {
  Card,
  CardBody,
  CardTitle,
  CardSubTitle,
  CardText,
  CardLink,
  CardHeader,
  CardFooter
} from '../components/controls/presentational/Card';

import {
  Grid,
  GridFluid,
  Row,
  RowNG,
  Col,
  ColBreak
} from '../components/controls/presentational/Grid';

import {
  ListGroup,
  ListGroupItem
} from '../components/controls/presentational/ListGroup';

class Components extends React.Component {
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
    console.log('col', <Col />);

    return (
      <div>
      <h3>Testing a foo</h3>
        <Foo />
        <hr/>
        <h3>List Group</h3>
        <ListGroup flush>
          <ListGroupItem>Foo</ListGroupItem>
          <ListGroupItem>Bar</ListGroupItem>
        </ListGroup>
        <hr/>
        <h3>Grid</h3>
        <GridFluid>
          <RowNG className="debug-container">
            <Col>1</Col>
            <Col className="debug-container">2</Col>
            <Col className="debug-container">3</Col>
            <Col className="debug-container">4</Col>
          </RowNG>
        </GridFluid>
        <hr/>
        <h3>Card</h3>
        <Card width="500px">
          <CardHeader>Header</CardHeader>
          <CardBody>
            <CardTitle>This is a card!</CardTitle>
            <CardSubTitle>Subtitles are cool</CardSubTitle>
            <CardText>Card! Card! Card! Card! </CardText>
            <CardLink href="http://www.google.com">Link text</CardLink>
          </CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
        <hr/>
        <Card width="500px">
          <CardBody>
            <CardTitle>This is a card!</CardTitle>
            <CardSubTitle>Subtitles are cool</CardSubTitle>
            <CardText>Card! Card! Card! Card! </CardText>
            <CardLink href="http://www.google.com">Link text</CardLink>
            <CardLink href="http://www.google.com">Link text</CardLink>
          </CardBody>
          <ListGroup flush>
            <ListGroupItem>Foo</ListGroupItem>
            <ListGroupItem>Bar</ListGroupItem>
          </ListGroup>
        </Card>
      </div>
    );
  }
}

Components.defaultProps = {};
Components.propTypes = {};

const mapStateToProps = state => {
  return {
    config: state.config
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Components);