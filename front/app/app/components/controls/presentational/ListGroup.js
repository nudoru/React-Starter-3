import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withBootStrap } from '../shared/bsHOC';
import { getBsClassName } from '../shared/utils';

// TODO https://getbootstrap.com/docs/4.0/components/list-group/#links-and-buttons

class BListGroup extends React.PureComponent {
  render() {
    console.log('listgroup props',this.props)
    const List = styled.ul.attrs({
      className: getBsClassName(
        '',
        this.props,
        this.props.flush ? 'list-group-flush' : null
      )
    })``;
    return <List {...this.props}>{this.props.children}</List>;
  }
}
// BListGroup.defaultProps = {
//   bsClass: 'list-group'
// };

// BListGroup.propTypes = {
//   flush: PropTypes.bool,
//   bsClass: PropTypes.string, // btn
//   bsStatus: PropTypes.string, // primary
//   bsSize: PropTypes.string, // sm
//   bsModifier: PropTypes.string, // block
//   ariaRole: PropTypes.string // Aria
// };

export const ListGroup = withBootStrap(BListGroup,'list-group');


class BListGroupItem extends React.PureComponent {
  render() {
    let Item = styled.li.attrs({
      className: getBsClassName('', this.props)
    })``;
    return <Item {...this.props}>{this.props.children}</Item>;
  }
}
// BListGroupItem.defaultProps = {
//   bsClass: 'list-group-item'
// };

// BListGroupItem.propTypes = {
//   flush: PropTypes.bool,
//   bsClass: PropTypes.string, // btn
//   bsStatus: PropTypes.string, // primary
//   bsSize: PropTypes.string, // sm
//   bsModifier: PropTypes.string, // block
//   ariaRole: PropTypes.string // Aria
// };


export const ListGroupItem = withBootStrap(BListGroupItem,'list-group-item');
