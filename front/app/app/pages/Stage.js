import React from 'react';
import { css } from 'emotion';
import { Module, ModuleContainer } from './regions/Module';

import {
  Card,
  CardBody,
  CardTitle,
  CardSubTitle,
  CardText,
  CardLink,
  CardHeader,
  CardXHeader,
  CardFooter
} from '../components/controls/Card';

import {
  Grid,
  GridFluid,
  Row,
  RowNG,
  RowAuto,
  Col,
  ColBreak
} from '../components/controls/Grid';

const componentStyle = css`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const paperShadowXS = css`box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.12);`;
const paperShadowSM = css`box-shadow: 0 3px 6px rgba(0,0,0,0.08), 0 3px 6px rgba(0,0,0,0.12);`;
const paperShadowM  = css`box-shadow: 0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.12);`;
const paperShadowLG = css`box-shadow: 0 14px 28px rgba(0,0,0,0.12), 0 10px 10px rgba(0,0,0,0.12);`;
const paperShadowXL = css`box-shadow: 0 19px 38px rgba(0,0,0,0.15), 0 15px 12px rgba(0,0,0,0.12);`;

const dropShadowXS = css`box-shadow: 0 1px 2px rgba(0,0,0,0.075)`;

const dropShadowSM = css`box-shadow: 0 2px 4px rgba(0,0,0,0.05), 2px 6px 8px -5px rgba(0,0,0,0.15)`;

const dropShadowM  = css`box-shadow: 0 2px 4px rgba(0,0,0,0.05), 4px 8px 15px -7px rgba(0,0,0,0.1), 4px 8px 20px rgba(0,0,0,0.10)`;

const dropShadowLG = css`box-shadow: 0 1px  6px  rgba(0, 0, 0, .1), 0 8px  8px  rgba(0, 0, 0, .05), 4px 23px 40px -15px rgba(0,0,0,0.15), 8px 30px 64px rgba(0, 0, 0, .1);`;

//https://codepen.io/ajspencer/pen/xXQbvK
const dropShadowXL = css`box-shadow: 0 1px  6px  rgba(0, 0, 0, .05), 0 8px  8px  rgba(0, 0, 0, .1), 0 16px 16px rgba(0, 0, 0, .1), 4px 32px 32px rgba(0, 0, 0, .05), 8px 50px 64px rgba(0, 0, 0, .15);`;

class Stage extends React.Component {

  state = {expanded: true};

  onClickSomething = e => {
    this.setState((prevState, props) => ({open: !prevState.open}));
  };

  render () {
    //className='full-window-cover-center risky_concrete'
    return <ModuleContainer>
      <Module full>
        <GridFluid className='pt-3'>

          <RowAuto className='mb-5'>
              <Card dropShadow='xs'>
                <CardBody>
                  <p>Shadow XS</p>
                </CardBody>
              </Card>
              <Card dropShadow='sm'>
                <CardBody>
                  <p>Shadow SM</p>
                </CardBody>
              </Card>
              <Card dropShadow='m'>
                <CardBody>
                  <p>Shadow M</p>
                </CardBody>
              </Card>
              <Card dropShadow='lg'>
                <CardBody>
                  <p>Shadow LG</p>
                </CardBody>
              </Card>
              <Card dropShadow='xl'>
                <CardBody>
                  <p>Shadow XL</p>
                </CardBody>
              </Card>
          </RowAuto>
          <RowAuto>
            <Card className={dropShadowXS}>
              <CardBody>
                <p>Shadow XS</p>
              </CardBody>
            </Card>
            <Card className={dropShadowSM}>
              <CardBody>
                <p>Shadow SM</p>
              </CardBody>
            </Card>
            <Card className={dropShadowM}>
              <CardBody>
                <p>Shadow M</p>
              </CardBody>
            </Card>
            <Card className={dropShadowLG}>
              <CardBody>
                <p>Shadow LG</p>
              </CardBody>
            </Card>
            <Card className={dropShadowXL}>
              <CardBody>
                <p>Shadow XL</p>
              </CardBody>
            </Card>
          </RowAuto>
        </GridFluid>
      </Module>
    </ModuleContainer>;
  }
}

Stage.defaultProps = {};
Stage.propTypes    = {};

export default Stage;
