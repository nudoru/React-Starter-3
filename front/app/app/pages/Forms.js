import React from 'react';
import {css} from 'emotion';
import {
  Module, ModuleContainer,
  ModuleTitle
} from '../components/containers/Module';
import {styles} from '../components/shared/Theme';

import {Form, Input, FormGroup, Label, Hint} from '../components/forms/Form';
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

  _holaValidator = val => val === 'Hola!';

  _onFormChange  = e => console.log('page, on form change', e);
  _onFieldChange = e => console.log('page, on field change', e);

  //onChange={this._onFieldChange}
//onChange={this._onFormChange}

  render() {
    return <ModuleContainer>
      <Module full>
        <ModuleTitle>Forms!</ModuleTitle>
        <Card dropShadow='m' width='100%'>
          <CardBody>
            <h4>Testing a form</h4>
            <hr/>
            <Form layout='horizontal'>
              <FormGroup name='mygroup1'>
                <Label>Label</Label>
                <Input validator={this._holaValidator} defaultValue='Hola!'
                       name='Testingfield' />
                <Hint>This is a hint</Hint>
              </FormGroup>
            </Form>
            <hr/>
            <Form >
              <FormGroup>
                <Label>Label</Label>
                <Input sm validator={this._holaValidator} defaultValue='Hola!' name='Testingfield'/>
                <Input validator={this._holaValidator} defaultValue='Hola!' name='Testingfield'/>
                <Input lg validator={this._holaValidator} defaultValue='Hola!' name='Testingfield'/>
                <Hint>This is a hint</Hint>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Module>
    </ModuleContainer>;
  }
}
