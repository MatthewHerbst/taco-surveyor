import Reflux from 'reflux';
import Immutable from 'immutable';
import {SurveyActions} from '../actions';
let utils = require('../utils');

module.exports = Reflux.createStore({
  listenables: [SurveyActions],
  init () {
    this.survey = Immutable.Map();
  },
  getInitialState () {
    return {
      survey: this.survey
    };
  },
  onGetSurvey (surveyId) {
    console.log('SurveyStore: getting')
    utils.ajaxRequest(
      '/get/surveys',
      Immutable.Map(),
      this.getSurveysSuccess(surveyId),
      utils.ajaxError('SurveyStore: failed getting survey ' + surveyId)
    );
  },
  getSurveysSuccess (surveyId) {
    return (data) => {
      let response = Immutable.fromJs(data);

      if(!response.has('error')) {
        console.log('SurveyStore: received new data for survey ' + surveyId, response.toJS());

        this.surveys = response;

        this.trigger({
          surveys: this.surveys
        });
      } else {
        console.error('SurveyStore: failed getting survey ' + surveyId, response.toJS());
        alert('There was a problem getting survey ' + surveyId + '. Please refresh the page. If this problem continues, please report the below error message to Taco-Surveyor Support\n\n' + response.get('error'));
      }
    }
  }
});
