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

export const ListGroup = withBootStrap('list-group')(BListGroup);


class BListGroupItem extends React.PureComponent {
  render() {
    let Item = styled.li.attrs({
      className: getBsClassName('', this.props)
    })``;
    return <Item {...this.props}>{this.props.children}</Item>;
  }
}

export const ListGroupItem = withBootStrap('list-group-item')(BListGroupItem);
