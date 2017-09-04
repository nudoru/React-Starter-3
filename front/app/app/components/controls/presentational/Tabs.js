import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withBootStrap } from '../shared/bsHOC';
import { getBsClassName } from '../shared/utils';

class BTabs extends React.PureComponent {
  state = { activeIndex: 0 };

  _onSelect = i => {
    this.setState({ activeIndex: i });
  };

  render() {
    const children = React.Children.map(this.props.children, (child, idx) => {
      return React.cloneElement(child, {
        activeIndex: this.state.activeIndex,
        onSelect: this._onSelect
      });
    });

    const el = styled.div.attrs({ className: getBsClassName(this.props) })``;
    return <el>{children}}</el>;
  }
}

class BTabList extends React.PureComponent {
  render() {
    const { activeIndex, onSelect } = this.props;

    const children = React.Children.map(this.props.children, (child, idx) => {
      return React.cloneElement(child, {
        active: activeIndex === idx,
        onSelectTab: () => onSelect(idx)
      });
    });

    const el = styled.div.attrs({ className: getBsClassName(this.props) })``;
    return <el>{children}}</el>;
  }
}

class BTab extends React.PureComponent {
  render() {
    const { onSelectTab } = this.props;
    const el = styled.div.attrs({ className: getBsClassName(this.props) })``;

    return <el onClick={onSelectTab}>{this.props.children}}</el>;
  }
}

class BTabPanels extends React.PureComponent {
  render() {
    const el = styled.div.attrs({ className: getBsClassName(this.props) })``;
    return <el>{this.props.children[this.props.activeIndex]}}</el>;
  }
}

class BTabPanel extends React.PureComponent {
  render() {
    const el = styled.div.attrs({ className: getBsClassName(this.props) })``;
    return <el>{this.props.children}}</el>;
  }
}

export const Tabs = withBootStrap('')(BTabs);
export const TabList = withBootStrap('')(BTabList);
export const Tab = withBootStrap('')(BTab);
export const TabPanels = withBootStrap('')(BTabPanels);
export const TabPanel = withBootStrap('')(BTabPanel);
