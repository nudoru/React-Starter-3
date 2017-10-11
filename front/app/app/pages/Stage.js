import React from 'react';

import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '../components/controls/Tabs';

import {
  Accordion,
  AccordionBody,
  AccordionTitle
} from "../components/controls/Accordion";

class Stage extends React.Component {

  state = {expanded: true};

  onClickSomething = e => {
    this.setState((prevState, props) => ({open: !prevState.open}));
  };

  render() {
    return <div className='full-window-cover-center risky_concrete'>
      <div className='p-5'>
        <Tabs>
          <TabList>
            <Tab>Lorem ipsum dolor sit amet</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae orci mi. Vestibulum tellus sem, tristique sed lacus sit amet, sollicitudin pharetra turpis. Ut sodales scelerisque urna bibendum varius. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis porta lobortis nisl, non blandit enim. Cras eros tortor, pellentesque ut orci vitae, consectetur dictum erat. Morbi auctor risus vitae neque fringilla congue. Integer ac augue quis mi viverra commodo. Nullam ornare, purus ut sollicitudin dignissim, elit arcu sollicitudin dui, ac dictum enim dolor id diam. Integer et lobortis elit. Maecenas varius feugiat magna, eu bibendum neque blandit eu. Nunc sed faucibus ante. Pellentesque at lectus at ante tempus condimentum. Aliquam ac consequat tortor, at rutrum neque. Nam fermentum nulla eget finibus imperdiet.
              <Accordion>
                <AccordionTitle>Click to expand</AccordionTitle>
                <AccordionBody>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                    vitae orci mi. Vestibulum tellus sem, tristique sed lacus sit
                    amet,
                    sollicitudin pharetra turpis. Ut sodales scelerisque urna bibendum
                    varius. Vestibulum ante ipsum primis in faucibus orci luctus
                    et</p>
                  <p>ultrices posuere cubilia Curae; Duis porta lobortis nisl, non
                    blandit enim. Cras eros tortor, pellentesque ut orci vitae,
                    consectetur dictum erat. Morbi auctor risus vitae neque fringilla
                    congue.</p>
                </AccordionBody>
              </Accordion>
            </TabPanel>
            <TabPanel>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae orci mi. Vestibulum tellus sem, tristique sed lacus sit amet, sollicitudin pharetra turpis. Ut sodales scelerisque urna bibendum varius.</TabPanel>
            <TabPanel><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae orci mi. Vestibulum tellus sem, tristique sed lacus sit amet, sollicitudin pharetra turpis. Ut sodales scelerisque urna bibendum varius. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis porta lobortis nisl, non blandit enim. Cras eros tortor, pellentesque ut orci vitae, consectetur dictum erat. Morbi auctor risus vitae neque fringilla congue. Integer ac augue quis mi viverra commodo. Nullam ornare, purus ut sollicitudin dignissim, elit arcu sollicitudin dui, ac dictum enim dolor id diam. Integer et lobortis elit. Maecenas varius feugiat magna, eu bibendum neque blandit eu. Nunc sed faucibus ante. Pellentesque at lectus at ante tempus condimentum. Aliquam ac consequat tortor, at rutrum neque. Nam fermentum nulla eget finibus imperdiet.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae orci mi. Vestibulum tellus sem, tristique sed lacus sit amet, sollicitudin pharetra turpis. Ut sodales scelerisque urna bibendum varius. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis porta lobortis nisl, non blandit enim. Cras eros tortor, pellentesque ut orci vitae, consectetur dictum erat. Morbi auctor risus vitae neque fringilla congue. Integer ac augue quis mi viverra commodo. Nullam ornare, purus ut sollicitudin dignissim, elit arcu sollicitudin dui, ac dictum enim dolor id diam. Integer et lobortis elit. Maecenas varius feugiat magna, eu bibendum neque blandit eu. Nunc sed faucibus ante. Pellentesque at lectus at ante tempus condimentum. Aliquam ac consequat tortor, at rutrum neque. Nam fermentum nulla eget finibus imperdiet.</p></TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>;
  }
}

Stage.defaultProps = {};
Stage.propTypes    = {};

export default Stage;
