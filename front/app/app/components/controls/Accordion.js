import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { Expo, TweenMax } from 'gsap';
import FaChevron from 'react-icons/lib/fa/chevron-right';
import { Card, CardBody, CardHeader } from './Card';
import { colorList, shadows } from '../shared/ThemeData';
import { Collapse } from '../shared/Collapse';
import { Col, Row } from './Grid';
import { Animate, TweenGroup } from '../shared/Animate';

const headerStyle = css`
  cursor: pointer;
  text-shadow: ${shadows.textLight};
  background-color: ${colorList.grey1};
  background-image: linear-gradient(
    -45deg,
    transparent 50%,
    rgba(0,0,0,0.05) 50.01%,
    rgba(0,0,0,0.05) 100%
  );
  background-size: 250%;
  background-position: 99% 99%;
  &:hover {
    background-position: 0 0;
    transition: background-position 240ms linear;
  }
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

  componentDidMount() {
    TweenMax.set(this.chevronRef,{scale: 0.75});
    if(this.props.open) {
      TweenMax.set(this.chevronRef,{rotation: 90});
    }
  }

  toggle = _ => {
    this.setState((prevState, props) => ({open: !prevState.open}));
  };

  _showChevronTween = ({target}) => {
    //y: '-3',
    return TweenMax.to(target, 0.75, {
      rotation: 90,
      ease    : Expo.easeOut
    });
  };

  _hideChevronTween = ({target}) => {
    return TweenMax.to(target, 0.75, {
      rotation: 0,
      ease    : Expo.easeOut
    });
  };

  render () {
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
                  tween={this.state.open ? this._showChevronTween : this._hideChevronTween}
                >
                  <div ref = { chevron => this.chevronRef = chevron }><FaChevron className={chevronIconStyle}/></div>
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
