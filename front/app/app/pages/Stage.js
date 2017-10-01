import React from 'react';

import {TiltCover} from "../components/controls/interactive/TiltCover";

class Stage extends React.Component {

  render() {
    return <div className='full-window-cover-center risky_concrete'>
      <TiltCover><h1>Hi</h1></TiltCover>
    </div>;
  }
}

Stage.defaultProps = {};
Stage.propTypes    = {};

export default Stage;
