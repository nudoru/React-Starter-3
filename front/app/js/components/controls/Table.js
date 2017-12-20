import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import {
  withStyles,
  buildClassName,
  bootStrapPropTypes
} from './common/StyleManager';
import { joinClasses, omit } from '../../utils/componentUtils';
import { colors, colorList, metrics, transitions } from '../../theme/Theme';

//https://alistapart.com/article/web-typography-tables

const componentStyle = css`
  .table {
    background-color: #fff;
  }
  .table caption {
    color: ${colorList.grey9};
    font-size: ${metrics.fontSizeSmall}; 
  }
  .table th {
    color: ${colorList.grey9};
    text-transform: uppercase;
    font-weight: normal;
  }
  .table thead th {
    border-top: none;
    border-bottom: ${metrics.accentBorderWidth} solid ${colors.primary};
    font-size: ${metrics.fontSizeSmall};
    text-align: center;
  }
  .table tbody th {
    border-top: 1px solid ${colorList.grey2};
    border-right: 1px solid ${colors.primary};
    text-align: center;
  }
  .table tbody td {
    border-top: 1px solid ${colorList.grey2};
  }
  

  .table-striped tbody th {
    border-top: none;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }
  .table-striped tbody td {
    border-top: none;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }
  
  .table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(0,0,0,0.025);
  }
  .table-hover tbody tr { 
    transition: background-color ${transitions.baseTiming/2}ms ${transitions.timingFunction}, box-shadow ${transitions.baseTiming*2}ms ${transitions.timingFunction}
  }
  .table-hover tbody tr:hover {
    background-color: rgba(0,0,0,0.1);
    box-shadow: inset 0 1px 10px rgba(0,0,0,0.05);
  }
  .table-bordered {
    border-color: ${colorList.grey3};
  }
  .table-bordered th {
    border-color: ${colorList.grey3};
  }
  .table-bordered td {
    border-color: ${colorList.grey3};
  }
`;

class BTable extends React.PureComponent {
  static propTypes    = {
    dark      : PropTypes.bool,
    striped   : PropTypes.bool,
    bordered  : PropTypes.bool,
    hover     : PropTypes.bool,
    responsive: PropTypes.bool
  };
  static defaultProps = {};

  render () {
    return (
      <table
        className={joinClasses(buildClassName(this.props), componentStyle)}>{this.props.children}</table>
    );
  }
}

export const Table = withStyles('table')(BTable);

export const TableHead = ({children, ...rest}) =>
  <thead {...rest}>{children}</thead>;

export const TableBody = ({children, ...rest}) =>
  <tbody {...rest}>{children}</tbody>;

export const TableCaption = ({children, ...rest}) =>
  <caption {...rest}>{children}</caption>;