import React from 'react';

import {TiltCover} from "../components/controls/interactive/TiltCover";

class Stage extends React.Component {

  render() {
    return <div className='full-window-cover-center risky_concrete'>
      <TiltCover className='mr-3 paper-shadow-xl grown_early'><h1>Hi</h1></TiltCover>
      <TiltCover className='mr-3 paper-shadow-xl malibu_beach'><h1>Hi</h1></TiltCover>
      <TiltCover className='mr-3 paper-shadow-xl mixed_hopes'><h1>Hi</h1></TiltCover>
    </div>;
  }
}

Stage.defaultProps = {};
Stage.propTypes    = {};

export default Stage;
