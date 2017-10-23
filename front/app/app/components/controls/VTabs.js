import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { buildClassName, withBootStrap } from '../shared/BootStrapHOC';
import { Nav, NavItem } from './Navigation';
import { Expando } from '../shared/Expando';
import { colors, metrics } from '../shared/ThemeData';
import { Col, RowNG } from './Grid';

class BVTabs extends React.PureComponent {
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
    return <RowNG className={buildClassName(this.props)}>{this.props.children}</RowNG>;
  }
}

class BVTabList extends React.PureComponent {
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

    return <Col width={3}><Nav stacked>{children}</Nav></Col>;
  }
}

class BVTab extends React.PureComponent {
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

const VTabPanelContainer = (props) => <div  className={tabPanelContainerStyle} {...props}/>;

class BVTabPanels extends React.PureComponent {
  static contextTypes = {
    activeIndex: PropTypes.number.isRequired
  };

  render() {
    const {activeIndex} = this.context;
    return <Col className={buildClassName(this.props)}>
      <VTabPanelContainer>
      <Expando>
        {this.props.children[activeIndex]}
      </Expando>
      </VTabPanelContainer>
    </Col>;
  }
}

class BVTabPanel extends React.PureComponent {
  render() {
    return <div
      className={buildClassName(this.props)}>{this.props.children}</div>;
  }
}

export const VTabs      = withBootStrap('')(BVTabs);
export const VTabList   = withBootStrap('nav')(BVTabList);
export const VTab       = withBootStrap('nav-item')(BVTab);
export const VTabPanels = withBootStrap('')(BVTabPanels);
export const VTabPanel  = withBootStrap('')(BVTabPanel);
