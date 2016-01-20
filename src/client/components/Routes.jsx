import React from 'react';
import {IndexRoute, Route, Router} from 'react-router';
import history from './history';

import About from './About';
import Admin from './Admin';
import App from './App';
import {Survey} from './survey';
import SurveyList from './SurveyList';
import SurveyManager from './SurveyManager';

const routes = (
  <Router history={history}>
    <Route path={'/'} component={App}>
      <IndexRoute component={About} />

      <Route path={'about'} component={About} />
      <Route path={'surveylist'} component={SurveyList} />
      <Route path={'surveys/:surveyId'} component={Survey} />

      <Route path={'admin'} component={Admin} >
        <Route path={'managesurvey/:surveyId'} component={SurveyManager} />
      </Route>

    </Route>
  </Router>
);

module.exports = routes;
