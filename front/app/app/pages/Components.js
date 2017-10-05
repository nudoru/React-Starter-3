import React from 'react';

import {
  Card,
  CardBody,
  CardTitle,
  CardSubTitle,
  CardText,
  CardLink,
  CardHeader,
  CardXHeader,
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

import {Nav, NavItem} from '../components/controls/interactive/Navigation.js';

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

import {Flip, Face} from '../components/controls/interactive/Flip';

import {withLoading} from '../components/controls/shared/IsLoadingHOC';

import {
  CoverTitle,
  CoverTitleBackground,
  CoverTitleBody,
  CoverTitleTitle,
  CoverTitleText
} from "../components/controls/interactive/CoverTItle";
import {TiltCover} from "../components/controls/interactive/TiltCover";

import {
  Alert,
  AlertHeading,
  AlertLink,
  AlertClose
} from '../components/controls/presentational/Alert';

import {Badge} from '../components/controls/presentational/Badge';
import {ProgressBar} from '../components/controls/presentational/ProgressBar';
import  {Jumbotron} from '../components/controls/presentational/Jumbotron';

const LoadingCard = withLoading(Card);

const FlipFront = (props) => {
  return (<div className='p-3'>
    <h1>Front!</h1>
    <Button primary onClick={props.flip}>Flip me</Button>
  </div>)
};

const FlipBack = (props) => {
  return (<div className='p-3'>
    <h2>Back of the card</h2>
    <Button light outline onClick={props.flip}>Flip me</Button>
  </div>)
};

const StageArea = (props) => <div
  className='p-5 flex-full-center risky_concrete'>{props.children}</div>

class Components extends React.Component {

  handleClick = e => {
    console.log('You clicked on something!', e);
  };

  render() {
    return (
      <div className="container mt-1">
        <Jumbotron><h1>Welcome to the components testing page</h1>
          <p className='lead'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae orci mi. Vestibulum tellus sem, tristique sed lacus sit amet, sollicitudin pharetra turpis. Ut sodales scelerisque urna bibendum varius. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis porta lobortis nisl, non blandit enim. </p>
          <p>Vestibulum tellus sem, tristique sed lacus sit amet, sollicitudin pharetra turpis. Ut sodales scelerisque urna bibendum varius.</p>
        </Jumbotron>
        <div className="pb-5">
          <h3 className="pb-3">Alerts</h3>
            <Alert info dismissible className='mb-2'>Informational <AlertClose onClick={this.handleClick}/></Alert>
            <Alert success className='mb-2'>Success</Alert>
            <Alert warning className='mb-2'>Warning</Alert>
            <Alert danger className='mb-2'>Danger</Alert>
            <Alert light className='mb-2'>Light</Alert>
            <Alert dark className='mb-2'>Dark</Alert>
            <Alert info dismissible>
              <AlertClose onClick={this.handleClick}/>
              <AlertHeading>Something important to say ...</AlertHeading>
              <p>It is a long established fact that a reader will be distracted by
                the readable content of a page when looking at its layout. The point
                of using Lorem Ipsum is that it has a more-or-less normal
                distribution of letters, as opposed to using 'Content here, content
                here', making it look like readable English.</p>
              <hr/>
              <AlertLink href='#' >Read more...</AlertLink>
            </Alert>
          <h3 className="mt-3 pb-3">Badges</h3>
          <Badge primary>Ima Badge</Badge>
          <Badge secondary>Ima Badge</Badge>
          <Badge success>Ima Badge</Badge>
          <Badge warning>Ima Badge</Badge>
          <Badge danger>Ima Badge</Badge>
          <Badge info>Ima Badge</Badge>
          <Badge light>Ima Badge</Badge>
          <Badge dark>Ima Badge</Badge>
          <hr/>
          <Badge primary pill>Ima Badge</Badge>
          <Badge secondary pill>Ima Badge</Badge>
          <Badge success pill>Ima Badge</Badge>
          <Badge warning pill>Ima Badge</Badge>
          <Badge danger pill>Ima Badge</Badge>
          <Badge info pill>Ima Badge</Badge>
          <Badge light pill>Ima Badge</Badge>
          <Badge dark pill>Ima Badge</Badge>
          <h3 className="mt-3 pb-3">Progress</h3>
          <ProgressBar percent={25} height={50} striped animated primary className='mb-2'/>
          <ProgressBar percent={25} height={2} striped animated primary className='mb-2'/>
          <ProgressBar percent={25} striped animated secondary className='mb-2'/>
          <ProgressBar percent={25} striped animated info className='mb-2'/>
          <ProgressBar percent={25} striped animated white className='mb-2'/>
          <ProgressBar percent={25} striped animated light className='mb-2'/>
          <ProgressBar percent={25} striped animated dark className='mb-2'/>
          <ProgressBar percent={25} striped animated success className='mb-2'/>
          <ProgressBar percent={25} striped animated warning className='mb-2'/>
          <ProgressBar percent={25} striped animated danger className='mb-2'/>
          <ProgressBar percent={50} striped className='mb-2'/>
          <ProgressBar percent={75} striped animated className='mb-2'/>
          <ProgressBar percent={100} className='mb-2'/>
        </div>
        <div className="pb-5">
          <h3 className="pb-3">Tilt Cover</h3>
          <StageArea>
            <TiltCover className='mr-3 paper-shadow-xl grown_early'><h1>Hi</h1></TiltCover>
            <TiltCover className='mr-3 paper-shadow-xl malibu_beach'><h1>Hi</h1></TiltCover>
            <TiltCover className='mr-3 paper-shadow-xl mixed_hopes'><h1>Hi</h1></TiltCover>
          </StageArea>
        </div>
        <div className="pb-5">
          <h3 className="pb-3">Cover Title</h3>
          <StageArea>
            <CoverTitle className='mr-3 paper-shadow-xl' width={150}>
              <CoverTitleBackground className='morpheus_den'><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p></CoverTitleBackground>
              <CoverTitleBody>
                <CoverTitleTitle>
                  <h5>Lorem Ipsum</h5>
                  <h2>What is Lorem Ipsum?</h2>
                </CoverTitleTitle>
                <CoverTitleText>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                </CoverTitleText>
              </CoverTitleBody>
            </CoverTitle>
            <CoverTitle className='paper-shadow-xl'>
              <CoverTitleBackground className='ripe_malinka'>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p></CoverTitleBackground>
              <CoverTitleBody>
                <CoverTitleTitle>
                  <h5>Lorem Ipsum</h5>
                  <h2>What is Lorem Ipsum?</h2>
                </CoverTitleTitle>
                <CoverTitleText>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                </CoverTitleText>
              </CoverTitleBody>
            </CoverTitle>
          </StageArea>
        </div>
        <div className="pb-5">
          <h3 className="pb-3">Flip card</h3>
          <StageArea>
            <Flip className='paper-shadow-xl mr-3' width={200} height={200}>
              <Face className='bg-white'><FlipFront/></Face>
              <Face className='bg-primary'><FlipBack/></Face>
            </Flip>
            <Flip className='paper-shadow-xl' width={200} height={200}>
              <Face className='bg-white'><FlipFront/></Face>
              <Face className='bg-info'><FlipBack/></Face>
            </Flip>
          </StageArea>
        </div>
        <div className="pb-5">
          <h3 className="pb-3">Misc Elements</h3>
          <Link href='#' className='pr-2'>This is a link</Link>
          <Link href='#' className='pr-2' underline={false}>This is a link with
            no
            underline</Link>
          <Link href='#' better>Ggreat Jjingles, a better underline</Link>
        </div>
        <div className="pb-5">
          <h3 className="pb-3">Card</h3>
          <GridFluid>
            <Row>
              <Col>
                <Card width='400px' dropShadow='xl'>
                  <CardXHeader height='100px' horizontal='center' vertical='center' className='morpheus_den p-2'><h2>Cool header</h2></CardXHeader>
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
                    <CardLink href="http://www.google.com">Link
                      gggtextjjj</CardLink>
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
    )
      ;
  }
}

Components.defaultProps = {};
Components.propTypes    = {};

export default Components;
