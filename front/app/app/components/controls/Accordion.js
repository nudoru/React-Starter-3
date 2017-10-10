import React from 'react';
import {css} from 'emotion';
import {Expo, TweenMax} from 'gsap';
import FaChevron from 'react-icons/lib/fa/chevron-down';
import {Card, CardBody, CardHeader} from "./Card";
import {colorList, gradients} from "../shared/ThemeData";
import {Collapse} from "../shared/Collapse";
import {Col, Row} from "./Grid";
import {Animate, TweenGroup} from "../shared/Animate";

const headerStyle = css`
  cursor: pointer;
  background-image: ${gradients.dark};
`;

const chevronStyle = css`
  flex-grow: 0 !important;
  padding-right: 0 !important;
`;

const chevronIconStyle = css`
    fill: ${colorList.blue};
`;

const headerCompStyle = css`
  padding-left: 5px !important;
`;

export class Accordion extends React.Component {
  static defaultProps = {};
  static propTypes    = {};

  state = {open: true};

  toggle = _ => {
    this.setState((prevState, props) => ({open: !prevState.open}));
  };

  _showContentTween = ({target}) => {
    return TweenMax.to(target, 0.75, {rotation: 0, scale: 1, y: '-2', ease: Expo.easeOut});
  }

  _hideContentTween = ({target}) => {
    return TweenMax.to(target, 0.75, {rotation: -90, scale: 0.75, y: 0, ease: Expo.easeOut});
  }

  render() {
    const {className = '', children, ...rest} = this.props;

    return (
      <div className={className}>
        <Card>
          <CardHeader className={headerStyle} onClick={this.toggle}>
            <Row>
              <Col className={chevronStyle}>
                  <TweenGroup
                    tween={this.state.open ? this._showContentTween : this._hideContentTween}
                  >
                    <div><FaChevron className={chevronIconStyle}/></div>
                  </TweenGroup>
              </Col>
              <Col className={headerCompStyle}>Header</Col>
            </Row>
          </CardHeader>
          <Collapse expand={this.state.open}>
            <CardBody>
              {children}
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}


export default Accordion;
