import React from 'react';
import {IndexRoute, Route, Router} from 'react-router';
import history from './history';

import About from './About';
import Admin from './Admin';
import App from './App';
import {Survey} from './survey';
import SurveyManager from './SurveyManager';

const routes = (
  <Router history={history}>
    <Route path={'/'} component={App}>
      <IndexRoute component={Survey} />

      <Route path={'about'} component={About} />
      <Route path={'survey'} component={Survey} />

      <Route path={'admin'} component={Admin} >
        <Route path={'managesurvey'} component={SurveyManager} />
      </Route>

    </Route>
  </Router>
);

module.exports = routes;
