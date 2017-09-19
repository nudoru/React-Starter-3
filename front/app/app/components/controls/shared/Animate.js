import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { TweenMax, Expo } from 'gsap';

//----------------------------------------------------------------------------------------------------------------------
//https://github.com/azazdeaz/react-gsap-enhancer/blob/master/src/utils.js

const walkItemTree = (itemTree, callback) => {
  function walk(map) {
    map.forEach(item => {
      if (item.node) {
        callback(item)
        if (item.children) {
          walk(item.children)
        }
      }
    })
  }
  walk(itemTree)
}

const restoreRenderedStyles = (itemTree) => {
  walkItemTree(itemTree, item => {
    const savedAttributeNames = Object.keys(item.savedAttributes || {})
    //restore the original attribute values
    savedAttributeNames.forEach(name => {
      item.node.setAttribute(name, item.savedAttributes[name])
    })
    //remove the attributes added after the render
    for (let i = 0; i < item.node.attributes.length; ++i) {
      const name = item.node.attributes[i].name
      if (savedAttributeNames.indexOf(name) === -1) {
        item.node.removeAttribute(name)
        --i
      }
    }
  })
}

const saveRenderedStyles = (itemTree) => {
  walkItemTree(itemTree, item => {
    item.savedAttributes = {}
    for (let i = 0; i < item.node.attributes.length; ++i) {
      const attribute = item.node.attributes[i]
      const name = attribute.name
      const value = attribute.value
      item.savedAttributes[name] = value
    }
    //item.node._gsTransform = null
    //item.node._gsTweenID = null
  })
}

// const reattachAll(itemTree, runningAnimations) {
//   restoreRenderedStyles(itemTree)
//   attachAll(runningAnimations)
// }

// const attachAll(runningAnimations) {
//   runningAnimations.forEach(animation => animation.attach())
// }


//----------------------------------------------------------------------------------------------------------------------




export class Animate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.tweenTargets = [];
    this.activeTweens = [];
  }

  componentWillReceiveProps(props) {
    this.tweenTargets = [];
    if (this.activeTweens) {
      this._stopAnimation();
    }
  }

  _stopAnimation() {
    console.log('Stopping tweens ...');
    this.activeTweens.forEach(a => {
      a.kill();
      //a.pause();
      //a.time(0);
    });
    this.activeTweens = [];
  }

  componentDidUpdate() {
    this._performAnimation();
  }

  componentDidMount() {
    this._performAnimation();
  }

  _getDOMElements(arry) {
    return arry.filter(i => !!i).map(ReactDOM.findDOMNode); //eslint-disable-line react/no-find-dom-node
  }

  _performAnimation() {
    if (this.props.go) {
      console.log('Animating...');
      // console.log(this.tweenElements);
      // TODO why do I have nulls in the array?
      const targets = this._getDOMElements(this.tweenTargets);

      console.log(targets, this.props.staggerTween, this.props.staggerDelay);

      //https://greensock.com/docs/TweenMax/static.staggerTo()
      this.activeTweens = TweenMax.staggerTo(
        targets,
        this.props.duration,
        this.props.staggerTween,
        this.props.staggerDelay
      );

      console.log(this.activeTweens);
    }
  }

  render() {
    const {
      children,
      parent,
      go,
      duration,
      staggerTween,
      inTween,
      outTween,
      onComplete,
      delay,
      staggerDelay,
      ...rest
    } = this.props;

    this.tweenTargets = [];

    const tweenChildren = React.Children.map(children, (child, idx) => {
      const el = React.cloneElement(child, {
        key: idx,
        ref: el => this.tweenTargets.push(el)
      });
      return el;
    });

    // TODO allow parent to be something other than a div
    return <div {...rest} children={tweenChildren} />; //eslint-disable-line react/no-children-prop
  }
}

Animate.defaultProps = {
  go: false,
  duration: 0.5,
  delay: 0.5,
  staggerDelay: 0.25,
  parent: <div />
};

Animate.propTypes = {
  go: PropTypes.bool,
  duration: PropTypes.number,
  staggerTween: PropTypes.object,
  inTween: PropTypes.object,
  outTween: PropTypes.object,
  onComplete: PropTypes.object,
  delay: PropTypes.number,
  staggerDelay: PropTypes.number,
  parent: PropTypes.object
};
