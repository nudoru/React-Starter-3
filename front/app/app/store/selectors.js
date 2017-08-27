import {memoize} from 'ramda';

// Memoized selector are incredibly slow in practice. There's a better way than this ...

// This one may not be useful since config is injected into page components via
// Redux's connect. But it serves as an example of the approach
export const configSelector = memoize(state => state.config);