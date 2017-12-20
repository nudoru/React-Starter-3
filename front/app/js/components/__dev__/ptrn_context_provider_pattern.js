
//http://reactpatterns.com
class SomeContextProvider extends React.Component {
  getChildContext() {
    return {some: "context"}
  }

  render() {
    return React.Children.only(this.props.children)
  }
}