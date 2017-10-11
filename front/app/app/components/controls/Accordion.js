import React from 'react';
import PropTypes from 'prop-types';
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
  flex-grow: 0;
  padding-right: 0;
`;

const chevronIconStyle = css`
    fill: ${colorList.blue};
`;

const headerCompStyle = css`
  padding-left: 5px;
  user-select: none;
`;

// TODO Update state when props change
export class Accordion extends React.Component {
  static defaultProps = {
    open: false
  };
  static propTypes    = {
    open: PropTypes.bool
  };

  state = {open: this.props.open};

  toggle = _ => {
    this.setState((prevState, props) => ({open: !prevState.open}));
  };

  _showContentTween = ({target}) => {
    //y: '-3',
    return TweenMax.to(target, 0.75, {
      rotation: 0,
      scale   : 1,
      ease    : Expo.easeOut
    });
  };

  _hideContentTween = ({target}) => {
    return TweenMax.to(target, 0.75, {
      rotation: -90,
      scale   : 0.75,
      y       : 0,
      ease    : Expo.easeOut
    });
  };

  render() {
    const {className = '', children: originalChildren, ...rest} = this.props;

    let titleComp = <p></p>,
        bodyComp  = originalChildren;

    React.Children.map(this.props.children, (child) => {
      if (child.type === AccordionTitle) {
        titleComp = child;
      } else if (child.type === AccordionBody) {
        bodyComp = child;
      }
    });

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
              <Col className={headerCompStyle}>{titleComp}</Col>
            </Row>
          </CardHeader>
          <Collapse expand={this.state.open}>
            <CardBody>
              {bodyComp}
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default Accordion;

export const AccordionTitle = (props) => props.children;
export const AccordionBody  = (props) => props.children;
