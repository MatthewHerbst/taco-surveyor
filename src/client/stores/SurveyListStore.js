import Reflux from 'reflux';
import Immutable from 'immutable';
import {SurveyListActions} from '../actions';
let utils = require('../utils')

module.exports = Reflux.createStore({
  listenables: [SurveyListActions],
  init () {
    this.surveys = Immutable.List();

    this.onGetSurveys();
  },
  getInitialState () {
    return {
      surveys: this.surveys
    };
  },
  onGetSurveys () {
    console.log('SurveyListStore: getting list of surveys');
    utils.ajaxRequest(
      '/get/surveys',
      Immutable.Map(),
      this.getSurveysSuccess,
      utils.ajaxError('SurveyListStore: failed getting the list of surveys')
    );
  },
  getSurveysSuccess (data) {
    let response = Immutable.fromJS(data);

    if(!response.has('error')) {
      console.log('SurveyListStore: received new survey list data', response.toJS());

      this.surveys = response;

      this.trigger({
        surveys: this.surveys
      });
    } else {
      console.error('SurveyListStore: failed getting survey list', response.toJS());
      alert('There was a problem getting the list of surveys. Please refresh the page. If this problem continues, please report the below error message to Taco-Surveyor Support\n\n' + response.get('error'));
    }
  }
});
