import React from 'react';

import {Card, CardBody, CardText, CardTitle} from "../components/controls/Card";
import Button from '../components/controls/Button';
import {Collapse} from "../components/shared/Collapse";

class Stage extends React.Component {

  state = {expanded: true};

  onClickSomething = e => {
    this.setState((prevState, props) => ({ expanded: !prevState.expanded }));
  };

  render () {
    return <div className='full-window-cover risky_concrete'>
      <div className='p-5'>
        <Card width='400px' dropShadow='xl'>
          <CardBody>
            <CardTitle>Collapse test</CardTitle>
            <Button onClick={this.onClickSomething}>Toggle</Button>
            <hr/>
            <div>
              <Collapse expand={this.state.expanded}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae orci mi. Vestibulum tellus sem, tristique sed lacus sit amet, sollicitudin pharetra turpis. Ut sodales scelerisque urna bibendum varius. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis porta lobortis nisl, non blandit enim. Cras eros tortor, pellentesque ut orci vitae, consectetur dictum erat. Morbi auctor risus vitae neque fringilla congue. Integer ac augue quis mi viverra commodo. Nullam ornare, purus ut sollicitudin dignissim, elit arcu sollicitudin dui, ac dictum enim dolor id diam. Integer et lobortis elit. Maecenas varius feugiat magna, eu bibendum neque blandit eu. Nunc sed faucibus ante. Pellentesque at lectus at ante tempus condimentum. Aliquam ac consequat tortor, at rutrum neque. Nam fermentum nulla eget finibus imperdiet.</p>
              </Collapse>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>;
  }
}

Stage.defaultProps = {};
Stage.propTypes    = {};

export default Stage;
