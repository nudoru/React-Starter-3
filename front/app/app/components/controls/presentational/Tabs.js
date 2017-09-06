import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withBootStrap } from '../shared/bsHOC';
import { getBsClassName } from '../shared/utils';
import Link from '../interactive/Link';

// TODO
// ARIA
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
        active: activeIndex === idx,
        onSelect: () => onSelectTab(idx)
      });
    });

    const styleProps = Object.assign({}, this.props);
    styleProps.bsModifier = 'nav-tabs';

    const TabListEl = styled.ul.attrs({
      className: getBsClassName('', styleProps)
    })`

    `;
    return <TabListEl>{children}</TabListEl>;
  }
}

class BTab extends React.PureComponent {
  render() {
    const { onSelect, active } = this.props;

    // TODO custom styles here?
    // const TabEl = styled.li.attrs({
    //   className: getBsClassName('nav-item', this.props)
    // })``;

    return (
      <li className="nav-item">
        <Link
          href="#"
          onClick={onSelect}
          className={'nav-link' + (active ? ' active' : '')}
        >
          {this.props.children}
        </Link>
      </li>
    );
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
export const TabList = withBootStrap('nav')(BTabList);
export const Tab = withBootStrap('nav-item')(BTab);
export const TabPanels = withBootStrap('')(BTabPanels);
export const TabPanel = withBootStrap('')(BTabPanel);
