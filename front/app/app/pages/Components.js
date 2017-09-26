import React from 'react';

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

import Button from '../components/controls/interactive/Button';

import {
  ButtonGroup,
  ButtonToolBar
} from '../components/controls/presentational/ButtonGroup';

import Link from '../components/controls/interactive/Link';

import { withLoading } from '../components/controls/shared/IsLoadingHOC';

const LoadingCard = withLoading(Card);

class Components extends React.Component {

  handleClick = e => {
    console.log('You clicked on something!', e);
  };

  render () {
    return (
      <div className="container mt-1">
        <div className="pb-5">
          <h3 className="pb-3">Misc Elements</h3>
          <Link href='#' className='pr-2'>This is a link</Link>
          <Link href='#' className='pr-2' underline={false}>This is a link with no underline</Link>
          <Link href='#' better>Ggreat Jjingles, a better underline</Link>
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
                    <CardLink href="http://www.google.com">Link gggtextjjj</CardLink>
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
          <GridFluid className='pt-3'>
            <Row>
              <Col>
                <Card dropShadow='xs'>
                  <CardBody>
                    <p>Shadow XS</p>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card dropShadow='sm'>
                  <CardBody>
                    <p>Shadow SM</p>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card dropShadow='m'>
                  <CardBody>
                    <p>Shadow M</p>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card dropShadow='lg'>
                  <CardBody>
                    <p>Shadow LG</p>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card dropShadow='xl'>
                  <CardBody>
                    <p>Shadow XL</p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </GridFluid>
        </div>

        <div className="pb-5">
          <h3 className="pb-3">Buttons</h3>
          <div className="pb-2">
            <Button primary onClick={this.handleClick}>Hiya</Button>
            <Button secondary>Hiya</Button>
            <Button success>Hiya</Button>
            <Button danger>Hiya</Button>
            <Button warning>Hiya</Button>
            <Button info>Hiya</Button>
            <Button light>Hiya</Button>
            <Button dark>Hiya</Button>
            <Button link>Hiya</Button>
          </div>
          <div className="pb-2">
            <Button outline primary>Hiya</Button>
            <Button outline secondary>Hiya</Button>
            <Button outline success>Hiya</Button>
            <Button outline danger>Hiya</Button>
            <Button outline warning>Hiya</Button>
            <Button outline info>Hiya</Button>
            <Button outline light>Hiya</Button>
            <Button outline dark>Hiya</Button>
          </div>
          <div className="pb-2">
            <Button sm primary>Small</Button>
            <Button primary>Regular</Button>
            <Button lg primary>Large</Button>
          </div>
          <div className="pb-2">
            <Button block primary>Block</Button>
          </div>
          <div className="pb-2">
            <Button primary active>Active</Button>
            <Button primary disabled>Disabled</Button>
            <Button primary secondary>Toggle</Button>
          </div>
          <div className="pb-2">
            <ButtonGroup className='pr-3' sm vertical>
              <Button primary>Active</Button>
              <Button primary>Disabled</Button>
              <Button primary>Toggle</Button>
            </ButtonGroup>
            <ButtonGroup className='pr-3'>
              <Button primary>Active</Button>
              <Button primary>Disabled</Button>
              <Button primary>Toggle</Button>
            </ButtonGroup>
            <ButtonGroup className='pt-3' lg>
              <Button primary>Active</Button>
              <Button primary>Disabled</Button>
              <Button primary>Toggle</Button>
            </ButtonGroup>
          </div>
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
          <h3 className="pb-3">Navigation</h3>
          <Card className="mb-3" dropShadow='m'>
            <CardBody>
              <h5>Default</h5>
              <Nav pullRight>
                <NavItem active>Navigation Item 1</NavItem>
                <NavItem onClick={this.handleClick}>Navigation Item 2</NavItem>
                <NavItem disabled>Navigation Item 3</NavItem>
              </Nav>
            </CardBody>
          </Card>
          <Card className="mb-3" dropShadow='xs'>
            <CardBody>
              <h5>Tabs</h5>
              <Nav tabs center>
                <NavItem active>Navigation Item 1</NavItem>
                <NavItem>Navigation Item 2</NavItem>
                <NavItem disabled>Navigation Item 3</NavItem>
              </Nav>
            </CardBody>
          </Card>
          <Card className="mb-3" dropShadow='xl'>
            <CardBody>
              <h5>Pills</h5>
              <Nav pills justified>
                <NavItem active>Navigation Item 1</NavItem>
                <NavItem>Navigation Item 2</NavItem>
                <NavItem disabled>Navigation Item 3</NavItem>
              </Nav>
            </CardBody>
          </Card>
          <Card className="mb-3">
            <CardBody>
              <h5>Stacked</h5>
              <Nav stacked pills>
                <NavItem active>Navigation Item 1</NavItem>
                <NavItem>Navigation Item 2</NavItem>
                <NavItem disabled>Navigation Item 3</NavItem>
              </Nav>
            </CardBody>
          </Card>
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
          <h3 className="pb-3">Loading HOC</h3>
          <LoadingCard loading message='Fetching the data'>
            <CardBody>
              <CardTitle>Done loading</CardTitle>
              <CardText>Whew! Glad we got that loading out of the way</CardText>
            </CardBody>
          </LoadingCard>
          <LoadingCard pending message='Reticulating splines'>
            <CardBody>
              <CardTitle>Done loading</CardTitle>
              <CardText>Whew! Glad we got that loading out of the way</CardText>
            </CardBody>
          </LoadingCard>
          <LoadingCard error
                       message='Call to reset flux capacitor encountered a temporal error!'>
            <CardBody>
              <CardTitle>Done loading</CardTitle>
              <CardText>Whew! Glad we got that loading out of the way</CardText>
            </CardBody>
          </LoadingCard>
        </div>
      </div>
    );
  }
}

Components.defaultProps = {};
Components.propTypes    = {};

export default Components;
