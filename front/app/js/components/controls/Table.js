import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import {createClassNameFromProps, withStyles} from './common/StyleManager';
import {joinClasses} from '../../utils/componentUtils';
import {colorList, metrics, tables, transitions} from '../../theme/Theme';

//https://alistapart.com/article/web-typography-tables

const componentStyle = css`
  font-variant-numeric: lining-nums tabular-nums;
  caption {
    color: ${tables.captionColor};
    font-size: ${metrics.fontSizeSmall}; 
    font-weight: 600;
    text-align: center;
    border-top: 1px solid ${tables.borderColor};
  }
  th, td {
    border: none;
    padding: ${metrics.spacing[3]}rem ${metrics.spacing[1]}rem;
    line-height: 1;
    text-align: "." center;
  }
   th {
    color: ${tables.headerColor};
    text-transform: uppercase;
    font-weight: 600;
  }
   thead th {
    border-bottom: 1px solid ${tables.borderColor};
    font-size: ${metrics.fontSize};
  }
   tbody th {
    border-right: 1px solid ${tables.rowBorderColor};
    text-align: center;
  }`;

//.table-striped
const stripedStyle = css`  
  tbody th {
    border-right: none;
  }
  tbody tr:nth-of-type(odd) {
    background-color: ${tables.zebraRowColor};
  }`;

//.table-hover
const hoverStyle = css`
  tbody th {
    border-right: none;
  }
  tbody tr { 
    transition: background-color ${transitions.baseTiming / 2}ms ${transitions.timingFunction}, box-shadow ${transitions.baseTiming * 2}ms ${transitions.timingFunction}
  }
  tbody tr:hover {
    background-color: rgba(0,0,0,0.1);
    box-shadow: inset 0 1px 10px rgba(0,0,0,0.05);
  }`;

// .table-bordered
const borderedStyle = css`
  border: none;
  border-top: 1px solid ${tables.borderColor};
  border-bottom: 1px solid ${tables.borderColor};
  caption {
    border-top: none;
  }
  th {
    border: none;
  }
  tbody td {
    border: none;
    border-top: 1px solid ${tables.rowBorderColor};
  }
  tbody th{
    border: none;
    border-right: 1px solid ${tables.rowBorderColor};
    border-top: 1px solid ${tables.rowBorderColor};
  }
`;

const hScrollStyle = css`
  max-width: 100%;
  overflow-x: auto;
  margin: 0;
`;

class BTable extends React.PureComponent {
  static propTypes = {
    dark      : PropTypes.bool,
    striped   : PropTypes.bool,
    bordered  : PropTypes.bool,
    hover     : PropTypes.bool,
    responsive: PropTypes.bool,
    hScroll   : PropTypes.bool
  };

  static defaultProps = {};

  render() {
    const tableEl = <table
      className={joinClasses(createClassNameFromProps(this.props),
        componentStyle,
        this.props.bordered ? borderedStyle : null,
        this.props.striped ? stripedStyle : null,
        this.props.hover ? hoverStyle : null
      )}>{this.props.children}</table>;

    if (this.props.hScroll) {
      return <figure className={hScrollStyle}>{tableEl}</figure>
    }

    return tableEl;
  }
}

export const Table = withStyles('table')(BTable);

export const TableHead = ({children, ...rest}) =>
  <thead {...rest}>{children}</thead>;

export const TableBody = ({children, ...rest}) =>
  <tbody {...rest}>{children}</tbody>;

export const TableCaption = ({children, ...rest}) =>
  <caption {...rest}>{children}</caption>;

/*
TODO
- Add a Th and Td element that sets a data-title on the html el
- For responsive table use CSS like this ...
@media (max-width: 25em) {
  table, caption, tbody, tr, th, td {
    display: block;
    text-align: left;
  }
  thead, th:empty, td:empty {
    display: none;
    visibility: hidden;
  }
  th[data-title]:before, td[data-title]:before {
    content: attr(data-title) ": ";
    display: inline-block;
    width: 3.5em;
  }
}
 */