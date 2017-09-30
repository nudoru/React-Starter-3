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
      <CoverTitle className='mr-3 paper-shadow-xl' width={150}>
        <CoverTitleBackground className='morpheus_den'/>
        <CoverTitleBody>
          <CoverTitleTitle>
            <h5>Lorem Ipsum</h5>
            <h2>What is Lorem Ipsum?</h2>
          </CoverTitleTitle>
          <CoverTitleText>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
          </CoverTitleText>
        </CoverTitleBody>
      </CoverTitle>
      <CoverTitle className='paper-shadow-xl'>
        <CoverTitleBackground className='ripe_malinka'/>
        <CoverTitleBody>
          <CoverTitleTitle>
            <h5>Lorem Ipsum</h5>
            <h2>What is Lorem Ipsum?</h2>
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
