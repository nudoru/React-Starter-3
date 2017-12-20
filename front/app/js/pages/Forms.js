import React from 'react';
import {css} from 'emotion';
import {
  Module, ModuleContainer,
  ModuleTitle
} from '../components/controls/containers/Module';
import {styles} from '../theme/Theme';

import {Form, Input, CheckBox, FormGroup, Label, Hint} from '../components/controls/forms/Form';
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

  /*
  <Form layout='horizontal'>
              <FormGroup name='mygroup1'>
                <Label>Label</Label>
                <Input validator={this._holaValidator} defaultValue='Hola!'
                       name='Testingfield' />
                <Hint>This is a hint</Hint>
              </FormGroup>
              <FormGroup>
                <Label>Do the thing?</Label>
                <CheckBox name='Testingfield'/>
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
              <FormGroup  layout='horizontal'>
                <Label>Do the thing?</Label>
                <CheckBox name='Testingfield'/>
              </FormGroup>
            </Form>
   */

  render() {
    return <ModuleContainer>
      <Module full>
        <ModuleTitle>Forms!</ModuleTitle>
        <Card dropShadow='m' width='100%'>
          <CardBody>
            <h4>Testing a form</h4>
            <hr/>

          </CardBody>
        </Card>
      </Module>
    </ModuleContainer>;
  }
}
