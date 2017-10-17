import { clone, compose, curry, equals, has, is, memoizeWith, mergeDeepRight, path } from 'ramda';
import {Either} from '../utils/functional';
/*
Ideas ...

I don't want the complexity and boiler plate of Redux
My needs and apps aren't complex enough to warrant Redux
I need a single immutable state object
I need to set keys and deeply set keys
I need to get a state key from JSON
I need to get keys and deeply get keys
I need to subscribe to changes on certain keys
 */

let _internalState = Object.create(null);
let _listeners     = {onChange: []};
let _debug         = true;

export const getState = _ => clone(_internalState);

export const getStatePath = keyPath => compose(clone, path(keyPath.split('.')))(_internalState);

export const setState = val => {
  let newState   = mergeDeepRight(_internalState, val);
  if(equals(newState, _internalState)) {
    return false;
  }
  _internalState = newState;
  dispatch();
  return true;
};


// TODO for ramda path, need to split str on dots
export const setStatePath = (keyPath, val) => {

};



const dispatch = keyPath => Either
  .fromBool(keyPath && has(keyPath, _listeners))
  .fold(
    _ => {_listeners.onChange.forEach(fn => fn(getState()));},
    _ => {_listeners[keyPath].forEach(fn => fn(getStatePath(keyPath)));}
    );

/**
 * Listen for a change on a specific key or listen for any change
 * Args listenerFn | keyPath, listenerFn
 *
 */
// TODO clean this up ...
export const listen = (...args) => {
        let keyPath, fn;

        if(_debug) {
          console.log('Listen called with', args);
        }

        if (args.length === 2 && is(String, args[0])) {
          keyPath = args[0];
          fn      = args[1];
        } else if (args[0]) {
          keyPath = 'onChange';
          fn      = args[0];
        } else {
          console.warn('Listen called with incorrect args', args);
          return false;
        }

        if (_listeners[keyPath]) {
          if (_debug) {
            console.log('adding listener for known keypath', keyPath, fn);
          }
          _listeners[keyPath].push(fn);
        } else {
          if (_debug) {
            console.log('adding listener for NEW keypath', keyPath, fn);
          }
          _listeners[keyPath] = [fn];
        }

        return () => unlisten(keyPath, fn);
      };

const unlisten = (keyPath, fn) => Either
  .fromBool(_listeners[keyPath].indexOf(fn) >= 0)
  .fold(
    _ => {
      console.warn('Can\'t unlisten. Called more than once?');
      return false;
    },
    _ => {
      let idx = _listeners[keyPath].indexOf(fn);
      _listeners[keyPath][idx] = null;
      _listeners[keyPath].splice(idx, 1);
      return true;
    }
  );