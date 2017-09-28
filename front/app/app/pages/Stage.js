import React from 'react';
import PropTypes from 'prop-types';
import { Flip, Face } from '../components/controls/interactive/Flip';
import Button from '../components/controls/interactive/Button';

const Front = (props) => {
  return (<div className='p-3'>
    <h1>Front!</h1>
    <Button primary onClick={props.flip}>Flip me</Button>
  </div>)
};

const Back = (props) => {
  return (<div className='p-3'>
    <h2>Back of the card</h2>
    <Button light outline onClick={props.flip}>Flip me</Button>
  </div>)
};

class Stage extends React.Component {

  render () {
    return <div className='full-window-cover-center risky_concrete'>
      <Flip className='paper-shadow-xl mr-3' width={300} height={500}>
        <Face className='bg-white'><Front/></Face>
        <Face className='bg-dark'><Back/></Face>
      </Flip>
      <Flip className='paper-shadow-lg mr-3' width={300} height={500}>
        <Face className='bg-white'><Front/></Face>
        <Face className='bg-dark'><Back/></Face>
      </Flip>
      <Flip className='paper-shadow-sm mr-3' width={300} height={500}>
        <Face className='bg-white'><Front/></Face>
        <Face className='bg-dark'><Back/></Face>
      </Flip>
    </div>;
  }
}

Stage.defaultProps = {};
Stage.propTypes    = {};

export default Stage;
