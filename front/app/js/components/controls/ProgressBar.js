import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import {createClassNameFromProps, withStyles} from './common/StyleManager';
import {joinClasses} from '../../utils/componentUtils';

const BBar = (props) =>
  <div className={createClassNameFromProps(props)} role="progressbar"
       style={{width: `${props.percent}%`, height: `${props.height}px`}}
       aria-valuenow={props.percent} aria-valuemin="0"
       aria-valuemax="100"></div>;

const Bar = withStyles('progress-bar')(BBar);

const componentStyle = css`
  box-shadow: inset 0 2px 10px rgba(0,0,0,.05);
  `;

// TODO Support multiple bars
export class ProgressBar extends React.PureComponent {
  static defaultProps = {
    percent: 50,
    height : 10
  };

  static propTypes = {
    percent: PropTypes.number,
    height : PropTypes.number
  };

  render() {
    const {className, ...rest} = this.props;

    return (
      <div
        style={{height: `${this.props.height}px`}}
        className={joinClasses('progress', componentStyle, className)}
      >
        <Bar {...rest}></Bar>
      </div>
    );
  }
}




