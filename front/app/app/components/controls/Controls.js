import React from 'react';
import Foo from './interactive/Foo';
import { withCommonCallbacks } from './shared/simpleHOC';

export const WFoo = withCommonCallbacks(Foo);