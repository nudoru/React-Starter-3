import React from 'react';

import {
  CoverTitle,
  CoverTitleBackground,
  CoverTitleBody,
  CoverTitleTitle,
  CoverTitleText
} from "../components/controls/interactive/CoverTItle";

class Stage extends React.Component {

  render() {
    return <div className='full-window-cover-center risky_concrete'>
      <CoverTitle>
        <CoverTitleBackground className='ripe_malinka'/>
        <CoverTitleBody>
          <CoverTitleTitle>
            <h1>Cover Title!</h1>
          </CoverTitleTitle>
          <CoverTitleText>
            <p>Some content!</p>
          </CoverTitleText>

        </CoverTitleBody>

      </CoverTitle>
    </div>;
  }
}

Stage.defaultProps = {};
Stage.propTypes    = {};

export default Stage;
