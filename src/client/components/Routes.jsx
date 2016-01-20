import React from 'react';
import {IndexRoute, Route, Router} from 'react-router';
import history from './history';

import About from './About';
import Admin from './Admin';
import App from './App';
import {Survey, SurveyList, SurveyManager} from './survey';

const routes = (
  <Router history={history}>
    <Route path={'/'} component={App}>
      <IndexRoute component={About} />

      <Route path={'about'} component={About} />

      <Route path={'surveys'} component={SurveyList} >
        <Route path={':surveyId'} component={Survey} />
      </Route>

      <Route path={'admin'} component={Admin} >
        <Route path={'managesurvey/:surveyId'} component={SurveyManager} />
      </Route>

    </Route>
  </Router>
);

module.exports = routes;
