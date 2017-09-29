import React from 'react';
import { Flip, Face } from '../components/controls/interactive/Flip';
import Button from '../components/controls/interactive/Button';

const FlipFront = (props) => {
  return (<div className='p-3'>
    <h1>Front!</h1>
    <Button primary onClick={props.flip}>Flip me</Button>
  </div>)
};

const FlipBack = (props) => {
  return (<div className='p-3'>
    <h2>Back of the card</h2>
    <Button light outline onClick={props.flip}>Flip me</Button>
  </div>)
};

class Stage extends React.Component {

  render () {
    return <div className='full-window-cover-center risky_concrete'>
      <Flip className='paper-shadow-lg mr-3' width={200} height={200}>
        <Face className='bg-white'><FlipFront/></Face>
        <Face className='bg-primary'><FlipBack/></Face>
      </Flip>
      <Flip className='paper-shadow-xl mr-3' width={200} height={200}>
        <Face className='bg-white'><FlipFront/></Face>
        <Face className='bg-danger'><FlipBack/></Face>
      </Flip>
      <Flip className='paper-shadow-sm mr-3' width={200} height={200}>
        <Face className='bg-white'><FlipFront/></Face>
        <Face className='bg-info'><FlipBack/></Face>
      </Flip>
    </div>;
  }
}

Stage.defaultProps = {};
Stage.propTypes    = {};

export default Stage;
