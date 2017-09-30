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
      <CoverTitle className='paper-shadow-xl'>
        <CoverTitleBackground className='ripe_malinka'><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p></CoverTitleBackground>
        <CoverTitleBody>
          <CoverTitleTitle>
            <h6>Lorem Ipsum</h6>
            <h3>What is Lorem Ipsum?</h3>
          </CoverTitleTitle>
          <CoverTitleText>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
          </CoverTitleText>
        </CoverTitleBody>
      </CoverTitle>
    </div>;
  }
}

Stage.defaultProps = {};
Stage.propTypes    = {};

export default Stage;
