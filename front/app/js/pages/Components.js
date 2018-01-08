import React from 'react';
import { css } from 'emotion';
import { styles } from '../theme/Theme';

import {
  ModuleContainer,
  Module,
  ModuleTitle,
  ModuleSubTitle
} from '../components/controls/containers/Module';
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
} from '../components/controls/Card';

import {
  FlexGrid,
  FlexGridFluid,
  FlexRow,
  FlexRowAuto,
  FlexRowNG,
  FlexCol,
  FlexColBreak
} from '../components/controls/containers/FlexGrid';

import {
  ListGroup,
  ListGroupItem
} from '../components/controls/ListGroup';

import { Nav, NavItem } from '../components/controls/Navigation.js';

import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '../components/controls/Tabs';

import {
  VTabs,
  VTabList,
  VTab,
  VTabPanels,
  VTabPanel
} from '../components/controls/VTabs';

import Button from '../components/controls/Button';

import {
  ButtonGroup,
  ButtonToolBar
} from '../components/controls/ButtonGroup';

import Link from '../components/controls/Anchor';

import { Flip, Face } from '../components/controls/Flip';

import FaRocket from 'react-icons/lib/fa/rocket';
import { Icon } from '../components/controls/Icon';

import { withLoading } from '../components/controls/common/WithLoading';

import {
  CoverTitle,
  CoverTitleBackground,
  CoverTitleBody,
  CoverTitleTitle,
  CoverTitleText
} from '../components/controls/CoverTitle';

import { TiltCover } from '../components/controls/TiltCover';

import {
  Alert,
  AlertHeading,
  AlertLink,
  AlertClose
} from '../components/controls/Alert';

import { Badge } from '../components/controls/Badge';
import { ProgressBar } from '../components/controls/ProgressBar';
import { Jumbotron } from '../components/controls/Jumbotron';

import {
  Accordion,
  AccordionBody,
  AccordionTitle
} from '../components/controls/Accordion';

import {
  Table,
  TableBody,
  TableCaption,
  TableHead
} from '../components/controls/Table';

const LoadingCard = withLoading(Card);

const FlipFront = props => <div className='p-3'>
    <h1>Front!</h1>
    <Button primary onClick={props.flip}>Flip me</Button>
  </div>;

const FlipBack = props => <div className='p-3'>
    <h1>Back!</h1>
    <Button light outline onClick={props.flip}>Flip me</Button>
  </div>;

const styleFlexFullCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export default class Components extends React.Component {

  handleClick = e => {
    console.log('You clicked on something!', e);
  };

  render () {
    return (
      <ModuleContainer>
        <Module className={styles.gradientDarkBars}>
          <Jumbotron><h1>Welcome to the components testing page</h1>
            <p className='lead'>I'm experimenting with a new component system.
              Focus is on: building on top of BootStrap 4, CSS-in-my-JS,
              animation
              with GSAP, simpler and concise component API and better component
              composition. This also iterates on my React boiler plate with
              updated deps, no more Redux and moved up to React 16.</p>
            <p>Source is on <Link
              href='https://github.com/nudoru/react-starter-3'>Github</Link>.
            </p>
          </Jumbotron>
        </Module>
        <Module className='risky_concrete'>
          <ModuleTitle>Desktop interactive elements</ModuleTitle>
          <ModuleSubTitle>Hover over each </ModuleSubTitle>
          <div className="pb-5">
            <h4 className="pb-3">Tilt Cover (hover over)</h4>
            <div className={styleFlexFullCenter}>
              <TiltCover className='mr-3 grown_early'>
                <h1>Hover
                  over me!</h1>
              </TiltCover>
              <TiltCover className='mr-3 malibu_beach' extent={50}><h1>Mee
                too</h1>
              </TiltCover>
              <TiltCover className='mr-3 mixed_hopes'
                         extent={100}><h1>Meee
                three</h1>
              </TiltCover>
            </div>
          </div>
          <div className="pb-5">
            <h4 className="pb-3">Cover Title (hover over)</h4>
            <div className={styleFlexFullCenter}>
              <CoverTitle className='mr-3' width={150}>
                <CoverTitleBackground className='morpheus_den'><p>Lorem Ipsum is
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s.</p></CoverTitleBackground>
                <CoverTitleBody>
                  <CoverTitleTitle>
                    <h5>Lorem Ipsum</h5>
                    <h2>What is Lorem Ipsum?</h2>
                  </CoverTitleTitle>
                  <CoverTitleText>
                    <p>Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries,
                      but also the leap into electronic typesetting, remaining
                      essentially unchanged.</p>
                  </CoverTitleText>
                </CoverTitleBody>
              </CoverTitle>
              <CoverTitle>
                <CoverTitleBackground className='ripe_malinka'>
                  <p>Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s.</p>
                </CoverTitleBackground>
                <CoverTitleBody>
                  <CoverTitleTitle>
                    <h5>Lorem Ipsum</h5>
                    <h2>What is Lorem Ipsum?</h2>
                  </CoverTitleTitle>
                  <CoverTitleText>
                    <p>Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries,
                      but also the leap into electronic typesetting, remaining
                      essentially unchanged.</p>
                  </CoverTitleText>
                </CoverTitleBody>
              </CoverTitle>
            </div>
          </div>
          <div className="pb-5">
            <h4 className="pb-3">Flip card</h4>
            <div className={styleFlexFullCenter}>
              <Flip className='mr-3' width={250} height={200}>
                <Face className='spring_warmth'><FlipFront/></Face>
                <Face className='night_fade'><FlipBack/></Face>
              </Flip>
              <Flip width={200} height={200}>
                <Face className='heavy_rain'><FlipFront/></Face>
                <Face className='tempting_azure'><FlipBack/></Face>
              </Flip>
            </div>
          </div>
        </Module>
        <Module className='bg-white'>
          <ModuleTitle>Content Reveal</ModuleTitle>
          <div className="pb-5">
            <h4 className="pb-3">Expando Tabs</h4>
            <Tabs>
              <TabList>
                <Tab>Lorem ipsum dolor sit amet</Tab>
                <Tab>Two</Tab>
                <Tab>Three</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit.
                  Integer vitae orci mi. Vestibulum tellus sem, tristique sed
                  lacus sit amet, sollicitudin pharetra turpis. Ut sodales
                  scelerisque urna bibendum varius. Vestibulum ante ipsum primis
                  in faucibus orci luctus et ultrices posuere cubilia Curae;
                  Duis
                  porta lobortis nisl, non blandit enim. Cras eros tortor,
                  pellentesque ut orci vitae, consectetur dictum erat. Morbi
                  auctor risus vitae neque fringilla congue. Integer ac augue
                  quis
                  mi viverra commodo. Nullam ornare, purus ut sollicitudin
                  dignissim, elit arcu sollicitudin dui, ac dictum enim dolor id
                  diam. Integer et lobortis elit. Maecenas varius feugiat magna,
                  eu bibendum neque blandit eu. Nunc sed faucibus ante.
                  Pellentesque at lectus at ante tempus condimentum. Aliquam ac
                  consequat tortor, at rutrum neque. Nam fermentum nulla eget
                  finibus imperdiet.
                  <Accordion className='mt-2'>
                    <AccordionTitle>Click to expand</AccordionTitle>
                    <AccordionBody>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit.
                        Integer
                        vitae orci mi. Vestibulum tellus sem, tristique sed
                        lacus
                        sit
                        amet,
                        sollicitudin pharetra turpis. Ut sodales scelerisque
                        urna
                        bibendum
                        varius. Vestibulum ante ipsum primis in faucibus orci
                        luctus
                        et</p>
                      <p>ultrices posuere cubilia Curae; Duis porta lobortis
                        nisl,
                        non
                        blandit enim. Cras eros tortor, pellentesque ut orci
                        vitae,
                        consectetur dictum erat. Morbi auctor risus vitae neque
                        fringilla
                        congue.</p>
                    </AccordionBody>
                  </Accordion>
                </TabPanel>
                <TabPanel>Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit.
                  Integer vitae orci mi. Vestibulum tellus sem, tristique sed
                  lacus sit amet, sollicitudin pharetra turpis. Ut sodales
                  scelerisque urna bibendum varius.</TabPanel>
                <TabPanel><p>Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Integer vitae orci mi. Vestibulum tellus sem, tristique
                  sed lacus sit amet, sollicitudin pharetra turpis. Ut sodales
                  scelerisque urna bibendum varius. Vestibulum ante ipsum primis
                  in faucibus orci luctus et ultrices posuere cubilia Curae;
                  Duis
                  porta lobortis nisl, non blandit enim. Cras eros tortor,
                  pellentesque ut orci vitae, consectetur dictum erat. Morbi
                  auctor risus vitae neque fringilla congue. Integer ac augue
                  quis
                  mi viverra commodo. Nullam ornare, purus ut sollicitudin
                  dignissim, elit arcu sollicitudin dui, ac dictum enim dolor id
                  diam. Integer et lobortis elit. Maecenas varius feugiat magna,
                  eu bibendum neque blandit eu. Nunc sed faucibus ante.
                  Pellentesque at lectus at ante tempus condimentum. Aliquam ac
                  consequat tortor, at rutrum neque. Nam fermentum nulla eget
                  finibus imperdiet.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer vitae orci mi. Vestibulum tellus sem, tristique sed
                    lacus sit amet, sollicitudin pharetra turpis. Ut sodales
                    scelerisque urna bibendum varius. Vestibulum ante ipsum
                    primis
                    in faucibus orci luctus et ultrices posuere cubilia Curae;
                    Duis porta lobortis nisl, non blandit enim. Cras eros
                    tortor,
                    pellentesque ut orci vitae, consectetur dictum erat. Morbi
                    auctor risus vitae neque fringilla congue. Integer ac augue
                    quis mi viverra commodo. Nullam ornare, purus ut
                    sollicitudin
                    dignissim, elit arcu sollicitudin dui, ac dictum enim dolor
                    id
                    diam. Integer et lobortis elit. Maecenas varius feugiat
                    magna,
                    eu bibendum neque blandit eu. Nunc sed faucibus ante.
                    Pellentesque at lectus at ante tempus condimentum. Aliquam
                    ac
                    consequat tortor, at rutrum neque. Nam fermentum nulla eget
                    finibus imperdiet.</p></TabPanel>
              </TabPanels>
            </Tabs>
            <hr/>
            <h4>Vertical tabs</h4>
            <VTabs>
              <VTabList>
                <VTab>Lorem ipsum dolor sit amet</VTab>
                <VTab>Aliquam ac consequat tortor, at rutrum neque. Nam
                  fermentum nulla eget
                  finibus imperdiet.</VTab>
                <VTab>Three</VTab>
              </VTabList>
              <VTabPanels>
                <VTabPanel>Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit.
                  Integer vitae orci mi. Vestibulum tellus sem, tristique sed
                  lacus sit amet, sollicitudin pharetra turpis. Ut sodales
                  scelerisque urna bibendum varius. Vestibulum ante ipsum primis
                  in faucibus orci luctus et ultrices posuere cubilia Curae;
                  Duis
                  porta lobortis nisl, non blandit enim. Cras eros tortor,
                  pellentesque ut orci vitae, consectetur dictum erat. Morbi
                  auctor risus vitae neque fringilla congue. Integer ac augue
                  quis
                  mi viverra commodo. Nullam ornare, purus ut sollicitudin
                  dignissim, elit arcu sollicitudin dui, ac dictum enim dolor id
                  diam. Integer et lobortis elit. Maecenas varius feugiat magna,
                  eu bibendum neque blandit eu. Nunc sed faucibus ante.
                  Pellentesque at lectus at ante tempus condimentum. Aliquam ac
                  consequat tortor, at rutrum neque. Nam fermentum nulla eget
                  finibus imperdiet.
                </VTabPanel>
                <VTabPanel>Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit.
                  Integer vitae orci mi. Vestibulum tellus sem, tristique sed
                  lacus sit amet, sollicitudin pharetra turpis. Ut sodales
                  scelerisque urna bibendum varius.</VTabPanel>
                <VTabPanel><p>Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Integer vitae orci mi. Vestibulum tellus sem, tristique
                  sed lacus sit amet, sollicitudin pharetra turpis. Ut sodales
                  scelerisque urna bibendum varius. Vestibulum ante ipsum primis
                  in faucibus orci luctus et ultrices posuere cubilia Curae;
                  Duis
                  porta lobortis nisl, non blandit enim. Cras eros tortor,
                  pellentesque ut orci vitae, consectetur dictum erat. Morbi
                  auctor risus vitae neque fringilla congue. Integer ac augue
                  quis
                  mi viverra commodo. Nullam ornare, purus ut sollicitudin
                  dignissim, elit arcu sollicitudin dui, ac dictum enim dolor id
                  diam. Integer et lobortis elit. Maecenas varius feugiat magna,
                  eu bibendum neque blandit eu. Nunc sed faucibus ante.
                  Pellentesque at lectus at ante tempus condimentum. Aliquam ac
                  consequat tortor, at rutrum neque. Nam fermentum nulla eget
                  finibus imperdiet.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer vitae orci mi. Vestibulum tellus sem, tristique sed
                    lacus sit amet, sollicitudin pharetra turpis. Ut sodales
                    scelerisque urna bibendum varius. Vestibulum ante ipsum
                    primis
                    in faucibus orci luctus et ultrices posuere cubilia Curae;
                    Duis porta lobortis nisl, non blandit enim. Cras eros
                    tortor,
                    pellentesque ut orci vitae, consectetur dictum erat. Morbi
                    auctor risus vitae neque fringilla congue. Integer ac augue
                    quis mi viverra commodo. Nullam ornare, purus ut
                    sollicitudin
                    dignissim, elit arcu sollicitudin dui, ac dictum enim dolor
                    id
                    diam. Integer et lobortis elit. Maecenas varius feugiat
                    magna,
                    eu bibendum neque blandit eu. Nunc sed faucibus ante.
                    Pellentesque at lectus at ante tempus condimentum. Aliquam
                    ac
                    consequat tortor, at rutrum neque. Nam fermentum nulla eget
                    finibus imperdiet.</p></VTabPanel>
              </VTabPanels>
            </VTabs>
          </div>
          <div className="pb-5">
            <h4 className="pb-3">Accordion</h4>
            <Accordion open={true}>
              <AccordionTitle>Click to expand</AccordionTitle>
              <AccordionBody>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer
                  vitae orci mi. Vestibulum tellus sem, tristique sed lacus sit
                  amet,
                  sollicitudin pharetra turpis. Ut sodales scelerisque urna
                  bibendum
                  varius. Vestibulum ante ipsum primis in faucibus orci luctus
                  et</p>
                <Accordion>
                  <AccordionTitle>Click to expand</AccordionTitle>
                  <AccordionBody>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Integer
                      vitae orci mi. Vestibulum tellus sem, tristique sed lacus
                      sit
                      amet,
                      sollicitudin pharetra turpis. Ut sodales scelerisque urna
                      bibendum
                      varius. Vestibulum ante ipsum primis in faucibus orci
                      luctus
                      et</p>
                    <Accordion>
                      <AccordionTitle>Click to expand</AccordionTitle>
                      <AccordionBody>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Integer
                          vitae orci mi. Vestibulum tellus sem, tristique sed
                          lacus sit
                          amet,
                          sollicitudin pharetra turpis. Ut sodales scelerisque
                          urna bibendum
                          varius. Vestibulum ante ipsum primis in faucibus orci
                          luctus
                          et</p>
                      </AccordionBody>
                    </Accordion>
                  </AccordionBody>
                </Accordion>
                <Accordion>
                  <AccordionTitle>Click to expand</AccordionTitle>
                  <AccordionBody>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Integer
                      vitae orci mi. Vestibulum tellus sem, tristique sed lacus
                      sit
                      amet,
                      sollicitudin pharetra turpis. Ut sodales scelerisque urna
                      bibendum
                      varius. Vestibulum ante ipsum primis in faucibus orci
                      luctus
                      et</p>
                  </AccordionBody>
                </Accordion>
                <Accordion>
                  <AccordionTitle>Click to expand</AccordionTitle>
                  <AccordionBody>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Integer
                      vitae orci mi. Vestibulum tellus sem, tristique sed lacus
                      sit
                      amet,
                      sollicitudin pharetra turpis. Ut sodales scelerisque urna
                      bibendum
                      varius. Vestibulum ante ipsum primis in faucibus orci
                      luctus
                      et</p>
                  </AccordionBody>
                </Accordion>
                <p>ultrices posuere cubilia Curae; Duis porta lobortis nisl, non
                  blandit enim. Cras eros tortor, pellentesque ut orci vitae,
                  consectetur dictum erat. Morbi auctor risus vitae neque
                  fringilla
                  congue.</p>
              </AccordionBody>
            </Accordion>
            <Accordion>
              <AccordionTitle>Click to expand</AccordionTitle>
              <AccordionBody>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer
                  vitae orci mi. Vestibulum tellus sem, tristique sed lacus sit
                  amet,
                  sollicitudin pharetra turpis. Ut sodales scelerisque urna
                  bibendum
                  varius. Vestibulum ante ipsum primis in faucibus orci luctus
                  et</p>
                <p>ultrices posuere cubilia Curae; Duis porta lobortis nisl, non
                  blandit enim. Cras eros tortor, pellentesque ut orci vitae,
                  consectetur dictum erat. Morbi auctor risus vitae neque
                  fringilla
                  congue.</p>
              </AccordionBody>
            </Accordion>
          </div>
        </Module>
        <Module>
          <ModuleTitle>Cards</ModuleTitle>
          <div className="pb-5">
            <h4 className="pb-3">Card</h4>
            <FlexGridFluid className='pb-5'>
              <FlexRowAuto>

                <Card width={'200px'} onClick={this.handleClick}>
                  <CardBody>
                    <CardTitle>This is a card!</CardTitle>
                    <CardText>This card has an onClick handler so it will show
                      an effet on hover</CardText>
                    <CardLink href="http://www.google.com">Link
                      gggtextjjj</CardLink>
                    <CardLink href="http://www.google.com">Link
                      text</CardLink>
                  </CardBody>
                </Card>

                <Card dropShadow='lg'>
                  <CardHeader>Header</CardHeader>
                  <CardBody>
                    <CardTitle>Lorem ipsum dolor sit amet</CardTitle>
                    <CardSubTitle>Integer vitae orci mi. Vestibulum tellus sem,
                      tristique sed lacus sit amet</CardSubTitle>
                    <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit. Integer vitae orci mi. Vestibulum tellus sem,
                      tristique sed lacus sit amet, sollicitudin pharetra
                      turpis. Ut sodales scelerisque urna bibendum varius.
                      Vestibulum ante ipsum primis in faucibus orci luctus et
                      ultrices posuere cubilia Curae; Duis porta lobortis nisl,
                      non blandit enim. </CardText>
                    <CardLink href="http://www.google.com">Link
                      text</CardLink>
                  </CardBody>
                  <CardFooter>
                    <Button secondary outline>Second</Button>
                    <Button primary>First</Button>
                  </CardFooter>
                </Card>

                <Card dropShadow='xl'>
                  <CardXHeader height='100px' horizontal='center'
                               vertical='center' className='morpheus_den p-2'>
                    <h2>Cool header</h2></CardXHeader>
                  <CardBody>
                    <CardTitle>This is a card!</CardTitle>
                    <CardSubTitle>Subtitles are cool</CardSubTitle>
                    <CardText>Card! Card! Card! Card! </CardText>
                    <CardLink href="http://www.google.com">Link
                      text</CardLink>
                  </CardBody>
                  <CardFooter>Footer</CardFooter>
                </Card>


              </FlexRowAuto>
            </FlexGridFluid>
            <FlexGridFluid className='mt-5'>
              <FlexRowAuto>
                <Card dropShadow='xs'>
                  <CardBody>
                    <p>Shadow XS</p>
                  </CardBody>
                </Card>
                <Card dropShadow='sm'>
                  <CardBody>
                    <p>Shadow SM</p>
                  </CardBody>
                </Card>
                <Card dropShadow='m'>
                  <CardBody>
                    <p>Shadow M</p>
                  </CardBody>
                </Card>
                <Card dropShadow='lg'>
                  <CardBody>
                    <p>Shadow LG</p>
                  </CardBody>
                </Card>
                <Card dropShadow='xl'>
                  <CardBody>
                    <p>Shadow XL</p>
                  </CardBody>
                </Card>
              </FlexRowAuto>
            </FlexGridFluid>
          </div>
        </Module>
        <Module>
          <ModuleTitle>Tables</ModuleTitle>
          <div className="pb-5">
            <h4 className="pb-3">Basic table</h4>
            <Table>
              <TableCaption>List of users</TableCaption>
              <TableHead>
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Username</th>
                  <th scope="col" className="text-right">Numbers</th>
                </tr>
              </TableHead>
              <TableBody>
                <tr>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td className="text-right">123</td>
                </tr>
                <tr>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td className="text-right">12.3</td>
                </tr>
                <tr>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                  <td className="text-right">1.23</td>
                </tr>
              </TableBody>
            </Table>
            <h4 className="pb-3">Borders</h4>
            <Table bordered>
              <TableCaption>List of users</TableCaption>
              <TableHead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Username</th>
                </tr>
              </TableHead>
              <TableBody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </TableBody>
            </Table>
            <h4 className="pb-3">Stripes</h4>
            <Table striped>
              <TableCaption>List of users</TableCaption>
              <TableHead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Username</th>
                </tr>
              </TableHead>
              <TableBody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </TableBody>
            </Table>
            <h4 className="pb-3">Bordered, striped and Hover</h4>
            <Table bordered striped hover>
              <TableCaption>List of users</TableCaption>
              <TableHead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Username</th>
                </tr>
              </TableHead>
              <TableBody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </TableBody>
            </Table>
          </div>
        </Module>
        <Module>
          <ModuleTitle>Buttons and Navigation</ModuleTitle>
          <div className="pb-5">
            <h4 className="pb-3">Buttons</h4>
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
              <Button pill primary>Hiya</Button>
              <Button pill outline sm primary>Hiya</Button>
              <Button round sm secondary>Hiya</Button>
              <Button round secondary>Hiya</Button>
              <Button round lg outline secondary>Hiya</Button>
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
            <h4 className="pb-3">Navigation</h4>
            <Card className="mb-3" dropShadow='m'>
              <CardBody>
                <h5>Default</h5>
                <Nav pullRight>
                  <NavItem active>Navigation Item 1</NavItem>
                  <NavItem onClick={this.handleClick}>Navigation Item
                    2</NavItem>
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
                <Nav stacked>
                  <NavItem active>Navigation Item 1</NavItem>
                  <NavItem>Navigation Item 2</NavItem>
                  <NavItem disabled>Navigation Item 3</NavItem>
                </Nav>
              </CardBody>
            </Card>
          </div>
          <div className="pb-5">
            <h4 className="pb-3">List Group</h4>
            <ListGroup>
              <ListGroupItem active>Foo</ListGroupItem>
              <ListGroupItem success>Bar</ListGroupItem>
              <ListGroupItem danger>Bazz</ListGroupItem>
              <ListGroupItem disabled>This</ListGroupItem>
              <ListGroupItem>That</ListGroupItem>
            </ListGroup>
          </div>
          <div className="pb-5">
            <h4 className="pb-3">Grid</h4>
            <FlexGridFluid className='mb-3'>
              <FlexRowNG className="debug-container">
                <FlexCol>1</FlexCol>
                <FlexCol className="debug-container">2</FlexCol>
                <FlexCol className="debug-container">3</FlexCol>
                <FlexCol className="debug-container">4</FlexCol>
              </FlexRowNG>
            </FlexGridFluid>
            <h5>Use RowAuto for easy, even cols</h5>
            <FlexGridFluid>
              <FlexRowAuto>
                <p>I'ma col!</p>
                <p>I'ma col!</p>
                <p>I'ma col!</p>
                <p>I'ma col!</p>
              </FlexRowAuto>
            </FlexGridFluid>
          </div>
        </Module>
        <Module>
          <ModuleTitle>Other junk</ModuleTitle>
          <div className="pb-5">
            <h4 className="pb-3">Loading HOC</h4>
            <LoadingCard loading message='Fetching the data'>
              <CardBody>
                <CardTitle>Done loading</CardTitle>
                <CardText>Whew! Glad we got that loading out of the
                  way</CardText>
              </CardBody>
            </LoadingCard>
            <LoadingCard pending message='Reticulating splines'>
              <CardBody>
                <CardTitle>Done loading</CardTitle>
                <CardText>Whew! Glad we got that loading out of the
                  way</CardText>
              </CardBody>
            </LoadingCard>
            <LoadingCard error
                         message='Call to reset flux capacitor encountered a temporal error!'>
              <CardBody>
                <CardTitle>Done loading</CardTitle>
                <CardText>Whew! Glad we got that loading out of the
                  way</CardText>
              </CardBody>
            </LoadingCard>
          </div>
          <div className="pb-5">
            <h4 className="pb-3">Icons</h4>
            <p>Using react-icons</p>
            <FlexGridFluid className='pt-3'>
              <FlexRowAuto className='mb-5'>
                <Icon xs>123</Icon>
                <Icon sm>123</Icon>
                <Icon>123</Icon>
                <Icon lg>123</Icon>
              </FlexRowAuto>
              <FlexRowAuto className='mb-5'>
                <Icon xs><FaRocket/></Icon>
                <Icon sm><FaRocket/></Icon>
                <Icon><FaRocket/></Icon>
                <Icon lg><FaRocket/></Icon>
                <Icon outline xs><FaRocket/></Icon>
                <Icon outline sm><FaRocket/></Icon>
                <Icon outline><FaRocket/></Icon>
                <Icon outline lg><FaRocket/></Icon>
              </FlexRowAuto>
              <FlexRowAuto className='mb-5'>
                <Icon primary><FaRocket/></Icon>
                <Icon secondary><FaRocket/></Icon>
                <Icon info><FaRocket/></Icon>
                <Icon light><FaRocket/></Icon>
                <Icon dark><FaRocket/></Icon>
                <Icon success><FaRocket/></Icon>
                <Icon warning><FaRocket/></Icon>
                <Icon danger><FaRocket/></Icon>
              </FlexRowAuto>
              <FlexRowAuto className='mb-5'>
                <Icon outline primary><FaRocket/></Icon>
                <Icon outline secondary><FaRocket/></Icon>
                <Icon outline info><FaRocket/></Icon>
                <Icon outline light><FaRocket/></Icon>
                <Icon outline dark><FaRocket/></Icon>
                <Icon outline success><FaRocket/></Icon>
                <Icon outline warning><FaRocket/></Icon>
                <Icon outline danger><FaRocket/></Icon>
              </FlexRowAuto>
            </FlexGridFluid>
          </div>
          <div className="pb-5">
            <h4 className="pb-3">Links</h4>
            <Link href='#' className='pr-2'>This is a link</Link>
            <Link href='#' className='pr-2' underline={false}>This is a link
              with
              no
              underline</Link>
            <Link href='#' better>Ggreat Jjingles, a better underline</Link>
            <h4 className="mt-3 pb-3">Alerts</h4>
            <Alert info dismissible className='mb-2'>Informational <AlertClose
              onClick={this.handleClick}/></Alert>
            <Alert success className='mb-2'>Success</Alert>
            <Alert warning className='mb-2'>Warning</Alert>
            <Alert danger className='mb-2'>Danger</Alert>
            <Alert light className='mb-2'>Light</Alert>
            <Alert dark className='mb-2'>Dark</Alert>
            <Alert info dismissible>
              <AlertClose onClick={this.handleClick}/>
              <AlertHeading>Something important to say ...</AlertHeading>
              <p>It is a long established fact that a reader will be distracted
                by
                the readable content of a page when looking at its layout. The
                point
                of using Lorem Ipsum is that it has a more-or-less normal
                distribution of letters, as opposed to using 'Content here,
                content
                here', making it look like readable English.</p>
              <hr/>
              <AlertLink href='#'>Read more...</AlertLink>
            </Alert>
            <h4 className="mt-3 pb-3">Badges</h4>
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
            <h4 className="mt-3 pb-3">Progress</h4>
            <ProgressBar percent={25} height={50} striped animated primary
                         className='mb-2'/>
            <ProgressBar percent={25} height={2} striped animated primary
                         className='mb-2'/>
            <ProgressBar percent={25} striped animated secondary
                         className='mb-2'/>
            <ProgressBar percent={25} striped animated info className='mb-2'/>
            <ProgressBar percent={25} striped animated white className='mb-2'/>
            <ProgressBar percent={25} striped animated light className='mb-2'/>
            <ProgressBar percent={25} striped animated dark className='mb-2'/>
            <ProgressBar percent={25} striped animated success
                         className='mb-2'/>
            <ProgressBar percent={25} striped animated warning
                         className='mb-2'/>
            <ProgressBar percent={25} striped animated danger className='mb-2'/>
            <ProgressBar percent={50} striped className='mb-2'/>
            <ProgressBar percent={75} striped animated className='mb-2'/>
            <ProgressBar percent={100} className='mb-2'/>
          </div>
        </Module>
      </ModuleContainer>
    );
  }
}