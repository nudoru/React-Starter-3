import React from 'react';
import { css } from 'emotion';
import { Module, ModuleContainer } from '../components/containers/Module';

import FaRocket from 'react-icons/lib/fa/rocket';
import {Icon} from '../components/controls/Icon';

import {
  Grid,
  GridFluid,
  Row,
  RowNG,
  RowAuto,
  Col,
  ColBreak
} from '../components/controls/Grid';

const componentStyle = css`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;


export  default class Stage extends React.Component {

  state = {expanded: true};

  onClickSomething = e => {
    this.setState((prevState, props) => ({open: !prevState.open}));
  };

  render () {
    return <ModuleContainer>
      <Module full>
        <GridFluid className='pt-3'>
          <RowAuto className='mb-5'>
            <Icon xs>123</Icon>
            <Icon sm>123</Icon>
            <Icon>123</Icon>
            <Icon lg>123</Icon>
          </RowAuto>
          <RowAuto className='mb-5'>
            <Icon xs><FaRocket/></Icon>
            <Icon sm><FaRocket/></Icon>
            <Icon><FaRocket/></Icon>
            <Icon lg><FaRocket/></Icon>
            <Icon outline xs><FaRocket/></Icon>
            <Icon outline sm><FaRocket/></Icon>
            <Icon outline><FaRocket/></Icon>
            <Icon outline lg><FaRocket/></Icon>
          </RowAuto>
          <RowAuto className='mb-5'>
            <Icon primary><FaRocket/></Icon>
            <Icon secondary><FaRocket/></Icon>
            <Icon info><FaRocket/></Icon>
            <Icon light><FaRocket/></Icon>
            <Icon dark><FaRocket/></Icon>
            <Icon success><FaRocket/></Icon>
            <Icon warning><FaRocket/></Icon>
            <Icon danger><FaRocket/></Icon>
          </RowAuto>
          <RowAuto className='mb-5'>
            <Icon outline primary><FaRocket/></Icon>
            <Icon outline secondary><FaRocket/></Icon>
            <Icon outline info><FaRocket/></Icon>
            <Icon outline light><FaRocket/></Icon>
            <Icon outline dark><FaRocket/></Icon>
            <Icon outline success><FaRocket/></Icon>
            <Icon outline warning><FaRocket/></Icon>
            <Icon outline danger><FaRocket/></Icon>
          </RowAuto>
        </GridFluid>
      </Module>
    </ModuleContainer>;
  }
}
