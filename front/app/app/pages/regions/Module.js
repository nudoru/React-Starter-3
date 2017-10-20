import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { modularScale } from '../../components/shared/ThemeData';
import { Container } from '../../components/controls/Container';
import { joinClasses } from '../../components/shared/utils';

//display: flex;
//flex-direction: column;
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
  padding-top: ${modularScale.ms3};
  padding-bottom: ${modularScale.ms3};
`;

const flexContentContainerStyle = props => css`
  display: flex;
  flex-direction: co;
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