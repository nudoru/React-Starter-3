import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import { withBootStrap, buildClassName, bootStrapPropTypes } from '../shared/BootStrapHOC';
import {joinClasses, omit} from '../shared/utils';

class BTable extends React.PureComponent {
  static propTypes = {
    dark: PropTypes.bool,
    striped:PropTypes.bool,
    bordered: PropTypes.bool,
    hover: PropTypes.bool,
    responsive: PropTypes.bool
  };
  static defaultProps = {};

  render() {
    return (
      <table className={buildClassName(this.props)}>{this.props.children}</table>
    );
  }
}

export const Table =  withBootStrap('table')(BTable);

export const TableHead    = ({children, ...rest}) => <thead {...rest}>{children}</thead>;
export const TableBody    = ({children, ...rest}) => <tbody {...rest}>{children}</tbody>;
export const TableCaption = ({children, ...rest}) => <caption {...rest}>{children}</caption>;