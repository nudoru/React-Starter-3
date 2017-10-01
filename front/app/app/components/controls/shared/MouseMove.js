import React from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// Initial implementation from https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce

export class MouseOverElement extends React.PureComponent {
  static propTypes = {
    render: PropTypes.func.isRequired
  };

  state = { x: 0, y: 0 };

  componentDidMount() {
    this.componentEl = ReactDOM.findDOMNode(this); //eslint-disable-line react/no-find-dom-node
  }

  handleMouseMove = e => {

    // To get mouse over screen use this
    // x: event.clientX,
    // y: event.clientY

    if(this.componentEl) {
      this.setState({
        x: e.pageX - this.componentEl.offsetLeft,
        y: e.pageY - this.componentEl.offsetTop
      })
    }
  };

  handleMouseLeave = _ => {
    this.setState({
      x: -1,
      y: -1
    })
  };

  render() {
    return (
      <span onMouseMove={this.handleMouseMove} onMouseLeave={this.handleMouseLeave}>
        {this.props.render(this.state)}
      </span>
    )
  }
}