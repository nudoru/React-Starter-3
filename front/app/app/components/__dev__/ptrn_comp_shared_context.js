const CONTEXT_NAME = '__super_context__';

class MainClass extends Component {
  static childContextTypes = {
    [CONTEXT_NAME]: PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      [CONTEXT_NAME]: this
    };
  }
}

class ChildClass extends Component {
  static contextTypes = {
    [CONTEXT_NAME]: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    // Put a reference to this component on the context so that it may be accessed 
    // by the whole complex component
    context[CONTEXT_NAME].childClass = this;
  }

  componentWillUnmount() {
    //need to remove it from the context here
    if (context[CONTEXT_NAME].childClass === this) {
      context[CONTEXT_NAME].childClass = null;
    }
  }
}
