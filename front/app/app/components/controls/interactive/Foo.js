import React from 'react';
import PropTypes from 'prop-types';

// Could you use React.PureComponent ?
class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    console.log('Current props: ', this.props);
    console.log('Next props: ', nextProps);
  }

  componentDidMount() {}

  _onMouseOver(e) {
    console.log('mouse OVER', e);
  }

  _onMouseOut(e) {
    console.log('mouse OUT', e);
  }

  _onClick(e) {
    console.log('mouse CLICK!', e);
  }

  render() {
    return (
      <h1
        onMouseEnter={e =>
          this.props.onMouseOver
            ? this.props.onMouseOver(e)
            : this._onMouseOver(e)}
        onMouseLeave={e =>
          this.props.onMouseOut
            ? this.props.onMouseOut(e)
            : this._onMouseOut(e)}
        onClick={e =>
          this.props.onClick ? this.props.onClick(e) : this._onClick(e)}
      >
        Foo!
      </h1>
    );
  }
}

Foo.defaultProps = {};
Foo.propTypes = {
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func
};

export default Foo;
