import React from 'react';
import { css } from 'emotion';
import {
  Module, ModuleContainer,
  ModuleTitle
} from '../components/containers/Module';
import { styles } from '../components/shared/Theme';

import {Form, Field} from '../components/forms/Form';
import {Card, CardBody} from '../components/controls/Card';

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
          <Card dropShadow='m'>
            <CardBody>
            <h4>Testing a form</h4>
            <hr/>
            <Form>
              <Field></Field>
            </Form>
            </CardBody>
          </Card>
      </Module>
    </ModuleContainer>;
  }
}
