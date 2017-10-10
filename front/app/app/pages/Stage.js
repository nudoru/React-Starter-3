import React from 'react';

import {Accordion} from "../components/controls/Accordion";

class Stage extends React.Component {

  state = {expanded: true};

  onClickSomething = e => {
    this.setState((prevState, props) => ({open: !prevState.open}));
  };

  render() {
    return <div className='full-window-cover risky_concrete'>
      <div className='p-5'>
        <Accordion>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            vitae orci mi. Vestibulum tellus sem, tristique sed lacus sit amet,
            sollicitudin pharetra turpis. Ut sodales scelerisque urna bibendum
            varius. Vestibulum ante ipsum primis in faucibus orci luctus et</p>
          <Accordion>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              vitae orci mi. Vestibulum tellus sem, tristique sed lacus sit amet,
              sollicitudin pharetra turpis. Ut sodales scelerisque urna bibendum
              varius. Vestibulum ante ipsum primis in faucibus orci luctus et</p>
          </Accordion>
          <Accordion className='mb-2'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              vitae orci mi. Vestibulum tellus sem, tristique sed lacus sit amet,
              sollicitudin pharetra turpis. Ut sodales scelerisque urna bibendum
              varius. Vestibulum ante ipsum primis in faucibus orci luctus et</p>
          </Accordion>
          <p>ultrices posuere cubilia Curae; Duis porta lobortis nisl, non
            blandit enim. Cras eros tortor, pellentesque ut orci vitae,
            consectetur dictum erat. Morbi auctor risus vitae neque fringilla
            congue.</p>
        </Accordion>
        <Accordion>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            vitae orci mi. Vestibulum tellus sem, tristique sed lacus sit amet,
            sollicitudin pharetra turpis. Ut sodales scelerisque urna bibendum
            varius. Vestibulum ante ipsum primis in faucibus orci luctus et</p>
          <Accordion>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              vitae orci mi. Vestibulum tellus sem, tristique sed lacus sit amet,
              sollicitudin pharetra turpis. Ut sodales scelerisque urna bibendum
              varius. Vestibulum ante ipsum primis in faucibus orci luctus et</p>
          </Accordion>
          <Accordion className='mb-2'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              vitae orci mi. Vestibulum tellus sem, tristique sed lacus sit amet,
              sollicitudin pharetra turpis. Ut sodales scelerisque urna bibendum
              varius. Vestibulum ante ipsum primis in faucibus orci luctus et</p>
          </Accordion>
          <p>ultrices posuere cubilia Curae; Duis porta lobortis nisl, non
            blandit enim. Cras eros tortor, pellentesque ut orci vitae,
            consectetur dictum erat. Morbi auctor risus vitae neque fringilla
            congue.</p>
        </Accordion>
      </div>
    </div>;
  }
}

Stage.defaultProps = {};
Stage.propTypes    = {};

export default Stage;
