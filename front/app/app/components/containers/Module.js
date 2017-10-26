import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { metrics, modularScale, colorList } from '../shared/Theme';
import { Container } from '../controls/Container';
import { joinClasses } from '../shared/utils';

const containerComponentStyle = css`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const ModuleContainer = ({className, children}) =>
  <div
    className={joinClasses(containerComponentStyle, className)}>{children}</div>;

const moduleComponentStyle = props => css`
  display: flex;
  width: 100%;
  flex: ${props.full ? '1' : '0 1 auto'};
`;

const contentContainerStyle = css`
  padding-top: ${modularScale.ms4};
  padding-bottom: ${modularScale.ms4};
`;

const flexContentContainerStyle = props => css`
  display: flex;
  flex-direction: column;
  align-items: ${props.middle ? 'center' : 'flex-start'};
  justify-content: ${props.center ? 'center' : 'flex-start'};
  flex: ${props.full ? 1 : 0};
`;

export class Module extends React.PureComponent {
  static propTypes = {
    middle: PropTypes.bool,
    center: PropTypes.bool,
    full  : PropTypes.bool
  };

  static defaultProps = {};

  _hasFlexProps = _ => {
    return this.props.middle || this.props.center || this.props.full;
  };

  render () {
    const {className, children} = this.props;

    return (
      <article
        className={joinClasses(moduleComponentStyle(this.props), className)}>
        <Container
          className={joinClasses(contentContainerStyle, (this._hasFlexProps()) ? flexContentContainerStyle(this.props) : null)}>
          {children}
        </Container>
      </article>
    );
  }
}

const titleStyle = css`
  color: ${colorList.grey10};
  font-size: ${modularScale.ms3};
  margin-bottom: ${modularScale.ms5};
  text-align: center;
`;

export const ModuleTitle = props => <h1
  className={titleStyle}>{props.children}</h1>;

const subTitleStyle = css`
  color: ${colorList.grey8};
  line-height: 1.25rem;
  font-size: ${modularScale.ms0};
  margin-top: -${modularScale.ms4};
  margin-bottom: ${modularScale.ms5};
  text-align: center;
`;

export const ModuleSubTitle = props => <h2
  className={subTitleStyle}>{props.children}</h2>;