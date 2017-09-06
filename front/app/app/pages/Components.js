import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextStyles } from '../components/mocks/textstyles';
import { StyledComponents } from '../components/mocks/styledcomponents';

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

import { Nav, NavItem } from '../components/controls/interactive/Navigation.js';

import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '../components/controls/presentational/Tabs';
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

  handleClick = e => {
    console.log('You clicked on something!', e);
  };

  render() {
    return (
      <div className="container mt-1">
        <div className="pb-5">
          <h3 className="pb-3">Navigation</h3>
          <Card className="mb-3">
            <CardBody>
              <h5>Default</h5>
              <Nav alignment="end">
                <NavItem active>Navigation Item 1</NavItem>
                <NavItem onClick={this.handleClick}>Navigation Item 2</NavItem>
                <NavItem disabled>Navigation Item 3</NavItem>
              </Nav>
            </CardBody>
          </Card>
          <Card className="mb-3">
            <CardBody>
              <h5>Tabs</h5>
              <Nav tabs alignment="center">
                <NavItem active>Navigation Item 1</NavItem>
                <NavItem>Navigation Item 2</NavItem>
                <NavItem disabled>Navigation Item 3</NavItem>
              </Nav>
            </CardBody>
          </Card>
          <Card className="mb-3">
            <CardBody>
              <h5>Pills</h5>
              <Nav pills justified >
                <NavItem active>Navigation Item 1</NavItem>
                <NavItem>Navigation Item 2</NavItem>
                <NavItem disabled>Navigation Item 3</NavItem>
              </Nav>
            </CardBody>
          </Card>
          <Card className="mb-3">
            <CardBody>
              <h5>Vetical</h5>
              <Nav vertical pills>
                <NavItem active>Navigation Item 1</NavItem>
                <NavItem>Navigation Item 2</NavItem>
                <NavItem disabled>Navigation Item 3</NavItem>
              </Nav>
            </CardBody>
          </Card>
        </div>
        <div className="pb-5">
          <h3 className="pb-3">Tabs</h3>
          <Tabs>
            <TabList>
              <Tab>One</Tab>
              <Tab>Two</Tab>
              <Tab>Three</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>One panel</TabPanel>
              <TabPanel>Two panel</TabPanel>
              <TabPanel>Three panel</TabPanel>
            </TabPanels>
          </Tabs>
        </div>
        <div className="pb-5">
          <h3 className="pb-3">List Group</h3>
          <ListGroup>
            <ListGroupItem active>Foo</ListGroupItem>
            <ListGroupItem success>Bar</ListGroupItem>
            <ListGroupItem danger>Bazz</ListGroupItem>
            <ListGroupItem disabled>This</ListGroupItem>
            <ListGroupItem>That</ListGroupItem>
          </ListGroup>
        </div>
        <div className="pb-5">
          <h3 className="pb-3">Grid</h3>
          <GridFluid>
            <RowNG className="debug-container">
              <Col>1</Col>
              <Col className="debug-container">2</Col>
              <Col className="debug-container">3</Col>
              <Col className="debug-container">4</Col>
            </RowNG>
          </GridFluid>
        </div>
        <div className="pb-5">
          <h3 className="pb-3">Card</h3>
          <GridFluid>
            <Row>
              <Col>
                <Card>
                  <CardHeader>Header</CardHeader>
                  <CardBody>
                    <CardTitle>This is a card!</CardTitle>
                    <CardSubTitle>Subtitles are cool</CardSubTitle>
                    <CardText>Card! Card! Card! Card! </CardText>
                    <CardLink href="http://www.google.com">Link text</CardLink>
                  </CardBody>
                  <CardFooter>Footer</CardFooter>
                </Card>
              </Col>
              <Col>
                <Card>
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
              </Col>
            </Row>
          </GridFluid>
        </div>
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
