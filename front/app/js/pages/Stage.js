import React from 'react';
import {css} from 'emotion';
import {Module, ModuleContainer} from '../components/controls/containers/Module';

import Button from '../components/controls/Button';
import {Flip, Face} from '../components/controls/Flip';

const FlipFront = props => <div className='p-3'>
  <h1>Front!</h1>
  <Button primary onClick={props.flip}>Flip me</Button>
</div>;

const FlipBack = props => <div className='p-3'>
  <h1>Back!</h1>
  <Button light outline onClick={props.flip}>Flip me</Button>
</div>;

const componentStyle = css`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;


export default class Stage extends React.Component {

  state = {expanded: true};

  onClickSomething = e => {
    this.setState((prevState, props) => ({open: !prevState.open}));
  };

  render() {
    return <div><Flip width={250} height={200}>
      <Face className='spring_warmth'><FlipFront/></Face>
      <Face className='night_fade'><FlipBack/></Face>
    </Flip>
      <Flip width={200} height={200}>
        <Face className='heavy_rain'><FlipFront/></Face>
        <Face className='tempting_azure'><FlipBack/></Face>
      </Flip>
    </div>;
  }
}
