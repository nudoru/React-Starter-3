import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withBootStrap } from '../shared/bsHOC';
import { getBsClassName } from '../shared/utils';

// TODO
// hooks for panelWillChange, panelDidChange, panelWillRemove, panelDidRemove
class BTabs extends React.PureComponent {
  state = { activeIndex: 0 };

  static childContextTypes = {
    activeIndex: PropTypes.number.isRequired,
    onSelectTab: PropTypes.func.isRequired
  };

  getChildContext() {
    return {
      activeIndex: this.state.activeIndex,
      onSelectTab: this.onSelectTab
    };
  }

  onSelectTab = i => {
    this.setState({ activeIndex: i });
  };

  render() {
    const TabsEl = styled.div.attrs({
      className: getBsClassName('', this.props)
    })`

    `;
    return <TabsEl>{this.props.children}</TabsEl>;
  }
}

class BTabList extends React.PureComponent {
  static contextTypes = {
    activeIndex: PropTypes.number.isRequired,
    onSelectTab: PropTypes.func.isRequired
  };

  render() {
    const { activeIndex, onSelectTab } = this.context;

    const children = React.Children.map(this.props.children, (child, idx) => {
      return React.cloneElement(child, {
        primary: activeIndex === idx,
        onSelect: () => onSelectTab(idx)
      });
    });

    const TabListEl = styled.div.attrs({
      className: getBsClassName('', this.props)
    })`

    `;
    return <TabListEl>{children}</TabListEl>;
  }
}

class BTab extends React.PureComponent {
  render() {
    const { onSelect } = this.props;
    const TabEl = styled.button.attrs({
      className: getBsClassName('', this.props)
    })`

    `;

    return <TabEl onClick={onSelect}>{this.props.children}</TabEl>;
  }
}

class BTabPanels extends React.PureComponent {
  static contextTypes = {
    activeIndex: PropTypes.number.isRequired
  };

  render() {
    const { activeIndex } = this.context;
    const TabPanelsEl = styled.div.attrs({
      className: getBsClassName('', this.props)
    })`

    `;
    return <TabPanelsEl>{this.props.children[activeIndex]}</TabPanelsEl>;
  }
}

class BTabPanel extends React.PureComponent {
  render() {
    const TabPanelEl = styled.div.attrs({
      className: getBsClassName('', this.props)
    })`

    `;
    return <TabPanelEl>{this.props.children}</TabPanelEl>;
  }
}

export const Tabs = withBootStrap('card')(BTabs);
export const TabList = withBootStrap('')(BTabList);
export const Tab = withBootStrap('btn')(BTab);
export const TabPanels = withBootStrap('')(BTabPanels);
export const TabPanel = withBootStrap('')(BTabPanel);
