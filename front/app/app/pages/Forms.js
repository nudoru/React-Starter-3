import React from 'react';
import { css } from 'emotion';
import {
  Module, ModuleContainer,
  ModuleTitle
} from '../components/containers/Module';
import { styles } from '../components/shared/Theme';

const componentStyle = css`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default class Forms extends React.Component {

  state = {expanded: true};

  handleClick = e => {
    console.log('You clicked on something!', e);
  };

  render () {
    return <ModuleContainer>
      <Module full>
        <ModuleTitle>Forms!</ModuleTitle>

      </Module>
    </ModuleContainer>;
  }
}
