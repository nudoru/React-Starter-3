import React from 'react';

import {
  CoverTitle,
  CoverTitleBackground,
  CoverTitleBody,
  CoverTitleTitle,
  CoverTitleText
} from '../components/controls/CoverTitle';

class Stage extends React.Component {

  state = {expanded: true};

  onClickSomething = e => {
    this.setState((prevState, props) => ({open: !prevState.open}));
  };

  render() {
    //className='full-window-cover-center risky_concrete'
    return <div >
      <div className='p-5'>
        <CoverTitle className='paper-shadow-xl'>
          <CoverTitleBackground className='ripe_malinka'>
            <p>Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s.</p>
          </CoverTitleBackground>
          <CoverTitleBody>
            <CoverTitleTitle>
              <h5>Lorem Ipsum</h5>
              <h2>What is Lorem Ipsum?</h2>
            </CoverTitleTitle>
            <CoverTitleText>
              <p>Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries,
                but also the leap into electronic typesetting, remaining
                essentially unchanged.</p>
            </CoverTitleText>
          </CoverTitleBody>
        </CoverTitle>
      </div>
    </div>;
  }
}

Stage.defaultProps = {};
Stage.propTypes    = {};

export default Stage;
