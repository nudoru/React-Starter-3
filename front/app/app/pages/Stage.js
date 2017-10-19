import React from 'react';
import { css } from 'emotion';
import { Module, ModuleContainer } from './regions/Module';



const componentStyle = css`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class Stage extends React.Component {

  state = {expanded: true};

  onClickSomething = e => {
    this.setState((prevState, props) => ({open: !prevState.open}));
  };

  render () {
    //className='full-window-cover-center risky_concrete'
    return <ModuleContainer>
      <Module full >

      </Module>
    </ModuleContainer>;
  }
}

Stage.defaultProps = {};
Stage.propTypes    = {};

export default Stage;
