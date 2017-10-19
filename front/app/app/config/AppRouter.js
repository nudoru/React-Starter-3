import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Components from '../pages/Components';
import Animations from '../pages/Animations';
import Styles from '../pages/Styles';
import Stage from '../pages/Stage';

const RouteMessage = ({children}) => <div><h1>{children}</h1></div>;

export const AppRouter = () =>
  <Router>
    <Switch>
      <Route exact path="/" component={Components}/>
      <Route path="/a" component={Animations}/>
      <Route path="/s" component={Stage}/>
      <Route path="/st" component={Styles}/>
      <Route path="/404" render={() => <RouteMessage>There&apos;s nothing
        here.</RouteMessage>}/>
      <Route render={() => <RouteMessage>There&apos;s nothing
        here.</RouteMessage>}/>
    </Switch>
  </Router>;