import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import { withBootStrap, generateClassName, bootStrapPropTypes } from '../shared/BootStrapHOC';
import {mergeClassNames, cleanProps} from '../shared/utils';

const TRACK_CSS = css`
box-shadow: inset 0 2px 10px rgba(0,0,0,.05);
`

const BBar = (props) =>
  <div className={generateClassName(props)} role="progressbar" style={{width:`${props.percent}%`, height:`${props.height}px`}} aria-valuenow={props.percent} aria-valuemin="0" aria-valuemax="100"></div>;

const Bar = withBootStrap('progress-bar')(BBar);

// TODO Support multiple bars
export class ProgressBar extends React.PureComponent {
  render() {
    const {className, ...rest} = this.props;

    return (
      <div className={mergeClassNames(['progress', TRACK_CSS].join(' '), className)}>
        <Bar {...rest}></Bar>
      </div>
    );
  }
}

ProgressBar.defaultProps = {
  percent: 50,
  height: 10
};
ProgressBar.propTypes = {
  percent: PropTypes.number,
  height: PropTypes.number
};


