import React from 'react';
import PropTypes from 'prop-types';
import { Flip, Face } from '../components/controls/interactive/Flip';

class Stage extends React.Component {

  render () {
    return <div className='full-window-cover-center risky_concrete'>
      <Flip>
        <Face>FRONT!</Face>
        <Face>BACK</Face>
      </Flip>
      <Flip>
        <Face>FRONT!</Face>
        <Face>BACK</Face>
      </Flip>
      <Flip>
        <Face>FRONT!</Face>
        <Face>BACK</Face>
      </Flip>
    </div>;
  }
}

Stage.defaultProps = {};
Stage.propTypes    = {};

export default Stage;
