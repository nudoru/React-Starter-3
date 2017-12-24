import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { createClassNameFromProps, withStyles } from './common/StyleManager';
import { Nav, NavItem } from './Navigation';
import { Expando } from './containers/Expando';
import { colors, metrics } from '../../theme/Theme';
import { FlexCol, FlexRowNG } from './containers/FlexGrid';

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
    return <FlexRowNG className={createClassNameFromProps(this.props)}>{this.props.children}</FlexRowNG>;
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

    return <FlexCol width={3}><Nav stacked>{children}</Nav></FlexCol>;
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
  padding: ${metrics.spacing[3]}rem;
`;

const VTabPanelContainer = (props) => <div  className={tabPanelContainerStyle} {...props}/>;

class BVTabPanels extends React.PureComponent {
  static contextTypes = {
    activeIndex: PropTypes.number.isRequired
  };

  render() {
    const {activeIndex} = this.context;
    return <FlexCol className={createClassNameFromProps(this.props)}>
      <VTabPanelContainer>
      <Expando>
        {this.props.children[activeIndex]}
      </Expando>
      </VTabPanelContainer>
    </FlexCol>;
  }
}

class BVTabPanel extends React.PureComponent {
  render() {
    return <div
      className={createClassNameFromProps(this.props)}>{this.props.children}</div>;
  }
}

export const VTabs      = withStyles('')(BVTabs);
export const VTabList   = withStyles('nav')(BVTabList);
export const VTab       = withStyles('nav-item')(BVTab);
export const VTabPanels = withStyles('')(BVTabPanels);
export const VTabPanel  = withStyles('')(BVTabPanel);
