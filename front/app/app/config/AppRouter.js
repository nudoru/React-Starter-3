import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import TemplatePage from '../pages/TemplatePage';
import Components from '../pages/Components';
import Animations from '../pages/Animations';
import Styles from '../pages/Styles';

const RouteMessage = ({children}) =>
  <div>
    <div className="color-bg-body">
      <h1>{children}</h1>
    </div>
  </div>;

export const AppRouter = ({config}) =>
  <Router>
    <div className="application-container">
      <div className="application-content">
        <Switch>
          <Route exact path="/" component={Animations}/>
          <Route path="/c" component={Components}/>
          <Route path="/s" component={Styles}/>
          <Route path="/404" render={() => <RouteMessage>There&apos;s nothing
            here.</RouteMessage>}/>
          <Route render={() => <RouteMessage>There&apos;s nothing
            here.</RouteMessage>}/>
        </Switch>
      </div>
    </div>
  </Router>;