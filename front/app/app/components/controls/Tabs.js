import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { buildClassName, withStyles } from '../shared/StyleManager';
import { Nav, NavItem } from './Navigation';
import { Expando } from '../shared/Expando';
import { colors, metrics } from '../shared/Theme';

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
        onSelect: _ => onSelectTab(idx)
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
  background-color: ${colors.exposabeContentBg};
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
    return <section
      className={buildClassName(this.props)}>{this.props.children}</section>;
  }
}

export const Tabs      = withStyles('')(BTabs);
export const TabList   = withStyles('nav')(BTabList);
export const Tab       = withStyles('nav-item')(BTab);
export const TabPanels = withStyles('')(BTabPanels);
export const TabPanel  = withStyles('')(BTabPanel);
