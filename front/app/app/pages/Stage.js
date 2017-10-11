import React from 'react';

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
    return <div className='full-window-cover risky_concrete'>
      <div className='p-5'>

      </div>
    </div>;
  }
}

Stage.defaultProps = {};
Stage.propTypes    = {};

export default Stage;
