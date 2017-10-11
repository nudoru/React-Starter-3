import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import {withBootStrap, buildClassName} from '../shared/BootStrapHOC';
import {Nav, NavItem} from './Navigation';
import {Expando} from "../shared/Expando";
import {metrics, colorList} from "../shared/ThemeData";

// TODO ARIA
// TODO hooks for panelWillChange, panelDidChange, panelWillRemove, panelDidRemove
class BTabs extends React.PureComponent {
  state = {activeIndex: 0};

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
    this.setState({activeIndex: i});
  };

  render() {
    return <div
      className={buildClassName(this.props)}>{this.props.children}</div>;
  }
}

// TODO set a max length on the tab label
// TODO Center, right align tabs as options
class BTabList extends React.PureComponent {
  static contextTypes = {
    activeIndex: PropTypes.number.isRequired,
    onSelectTab: PropTypes.func.isRequired
  };

  render() {
    const {activeIndex, onSelectTab} = this.context;

    const children = React.Children.map(this.props.children, (child, idx) => {
      return React.cloneElement(child, {
        active  : activeIndex === idx,
        onSelect: () => onSelectTab(idx)
      });
    });

    return <Nav tabs>{children}</Nav>;
  }
}

class BTab extends React.PureComponent {
  handleClick = e => {
    e.preventDefault();
    this.props.onSelect();
  };

  render() {
    const {active, ...rest} = this.props;

    return <NavItem active={active}
                    onClick={this.handleClick} {...rest}/>;
  }
}


const tabPanelContainerStyle = css`
  border-left: 1px solid ${colorList.blue};
  border-right: 1px solid ${colorList.blue};
  border-bottom: 1px solid ${colorList.blue};
  background-color: #fff;
  padding: ${metrics.spacing};
`;

const TabPanelContainer = (props) => <div  className={tabPanelContainerStyle} {...props}/>;

class BTabPanels extends React.PureComponent {
  static contextTypes = {
    activeIndex: PropTypes.number.isRequired
  };

  render() {
    const {activeIndex} = this.context;
    return <div className={buildClassName(this.props)}>
      <TabPanelContainer>
      <Expando>
        {this.props.children[activeIndex]}
      </Expando>
      </TabPanelContainer>
    </div>;
  }
}

class BTabPanel extends React.PureComponent {
  render() {
    return <div
      className={buildClassName(this.props)}>{this.props.children}</div>;
  }
}

export const Tabs      = withBootStrap('')(BTabs);
export const TabList   = withBootStrap('nav')(BTabList);
export const Tab       = withBootStrap('nav-item')(BTab);
export const TabPanels = withBootStrap('')(BTabPanels);
export const TabPanel  = withBootStrap('')(BTabPanel);
