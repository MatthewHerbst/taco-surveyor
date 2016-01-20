import Reflux from 'reflux';
import Immutable from 'immutable';
import {SurveyActions} from '../actions';
let utils = require('../utils');

module.exports = Reflux.createStore({
  listenables: [SurveyActions],
  init () {
    this.survey = Immutable.Map({
      createdAt: '',
      id: -1,
      name: '',
      questions: Immutable.List(),
      updatedAt: ''
    });

    this.currentQuestion = Immutable.Map({
      Answers: Immutable.List(),
      createdAt: '',
      id: -1,
      surveyId: -1,
      prompt: '',
      updatedAt: ''
    });
  },
  getInitialState () {
    return {
      survey: this.survey,
      currentQuestion: this.currentQuestion
    };
  },
  onGetQuestion (surveyId) {
    console.log('SurveyStore: getting question for survey ' + surveyId);
    utils.ajaxRequest(
      '/get/question',
      Immutable.Map({surveyId: surveyId}),
      this.getQuestionSuccess(surveyId),
      utils.ajaxError('SurveyStore: failed getting question for survey ' + surveyId)
    );
  },
  onGetSurvey (surveyId) {
    console.log('SurveyStore: getting survey ' + surveyId);
    utils.ajaxRequest(
      '/get/surveys',
      Immutable.Map({surveyId: surveyId}),
      this.getSurveysSuccess(surveyId),
      utils.ajaxError('SurveyStore: failed getting survey ' + surveyId)
    );

    // We know that we need a new question if we are loading a new survey
    this.onGetQuestion(surveyId);
  },
  getQuestionSuccess (surveyId) {
    return (data) => {
      let response = Immutable.fromJS(data);

      if(!response.has('error')) {
        console.log('SurveyStore: received new question for survey ' + surveyId, response.toJS());

        this.currentQuestion = response;

        this.trigger({
          currentQuestion: this.currentQuestion
        });
      } else {
        console.error('SurveyStore: failed getting question for survey ' + surveyId, response.toJS());
        alert('There was a problem getting the next question. Please refresh the page. If this problem continues, please report the below error message to Taco-Surveyor Support\n\n' + response.get('error'));
      }
    };
  },
  getSurveysSuccess (surveyId) {
    return (data) => {
      let response = Immutable.fromJS(data);

      if(!response.has('error')) {
        console.log('SurveyStore: received new data for survey ' + surveyId, response.toJS());

        this.survey = response;

        this.trigger({
          survey: this.survey
        });
      } else {
        console.error('SurveyStore: failed getting survey ' + surveyId, response.toJS());
        alert('There was a problem getting survey ' + surveyId + '. Please refresh the page. If this problem continues, please report the below error message to Taco-Surveyor Support\n\n' + response.get('error'));
      }
    };
  }
});
