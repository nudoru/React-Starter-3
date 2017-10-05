import React from 'react';

import {ProgressBar} from '../components/controls/presentational/ProgressBar';

class Stage extends React.Component {

  onClickSomething = e => console.log(e);

  render () {
    return <div className='full-window-cover risky_concrete'>
      <div className='p-5'>

      </div>
    </div>;
  }
}

Stage.defaultProps = {};
Stage.propTypes    = {};

export default Stage;
