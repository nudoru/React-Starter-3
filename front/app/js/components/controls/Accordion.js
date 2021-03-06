import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { Expo, TweenMax } from 'gsap';
import FaChevron from 'react-icons/lib/fa/chevron-right';
import { Card, CardBody, CardHeader } from './Card';
import {
  modularScale,
  colorList, shadows, transitions, metrics,
  colors
} from '../../theme/Theme';
import { Collapse } from './containers/Collapse';
import { FlexCol, FlexRow } from './containers/FlexGrid';
import { TweenGroup } from './common/Animate';
import { joinClasses } from '../../utils/componentUtils';

const componentStyle = css`
  border-radius: 0 !important;
`;

const headerStyle = css`
  cursor: pointer;
  padding-top: ${modularScale['ms-1']};
      padding-bottom: ${modularScale['ms-1']};
  text-shadow: ${shadows.textLight};
  border-bottom: ${metrics.accentBorderWidth} solid ${colorList.grey3};
  margin-bottom: -1px;
  background-color: ${colorList.grey1};
  background-image: linear-gradient(
    -45deg,
    transparent 50%,
    rgba(0,0,0,0.05) 50.01%,
    rgba(0,0,0,0.05) 100%
  );
  background-size: 250%;
  background-position: 99% 99%;
  z-index: 1;
  transition: background-position ${transitions.baseTiming * 2}ms ${transitions.timingFunction};
  &:hover {
    background-position: 0 0;
    transition: background-position ${transitions.baseTiming * 2}ms ${transitions.timingFunction};
  }
`;

const chevronColStyle = css`
  flex-grow: 0;
  padding-right: 0;
`;

const chevronIconStyle = css`
    fill: ${colors.primary};
`;

const headerColStyle = css`
  padding-left: 5px;
  user-select: none;
`;

const contentContainerStyle = css`
  background-color: ${colors.exposabeContentBg};
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
    return TweenMax.to(target, 0.75, {
      rotation: 90,
      // y: '-3',
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

    React.Children.forEach(this.props.children, (child) => {
      if (child.type === AccordionTitle) {
        titleComp = child;
      } else if (child.type === AccordionBody) {
        bodyComp = child;
      }
    });

    return (
        <Card className={joinClasses(componentStyle, className)}>
          <CardHeader className={headerStyle} onClick={this.toggle}>
            <FlexRow>
              <FlexCol className={chevronColStyle}>
                <TweenGroup
                  tween={this.state.open ? this._showChevronTween : this._hideChevronTween}
                >
                  <div ref = { chevron => this.chevronRef = chevron }><FaChevron className={chevronIconStyle}/></div>
                </TweenGroup>
              </FlexCol>
              <FlexCol className={headerColStyle}>{titleComp}</FlexCol>
            </FlexRow>
          </CardHeader>
          <Collapse expand={this.state.open}>
            <CardBody className={contentContainerStyle}>
              {bodyComp}
            </CardBody>
          </Collapse>
        </Card>
    );
  }
}

export default Accordion;

export const AccordionTitle = (props) => props.children;
export const AccordionBody  = (props) => props.children;
