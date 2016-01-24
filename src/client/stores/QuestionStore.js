import Reflux from 'reflux';
import Immutable from 'immutable';
import {QuestionActions} from '../actions';
import UserStore from './UserStore';
let utils = require('../utils');

module.exports = Reflux.createStore({
  listenables: [QuestionActions],
  init () {
    this.listenTo(UserStore, this.userStoreChange);

    this.question = null;
    this.questionsAvailable = true;
    this.selectedAnswerId = -1;
  },
  getInitialState () {
    return {
      question: this.question,
      questionsAvailable: this.questionsAvailable,
      selectedAnswerId: this.selectedAnswerId
    };
  },
  onGetQuestion () {
    console.log('QuestionStore: getting new question');
    utils.ajaxRequest(
      '/question',
      Immutable.Map(),
      this.onGetQuestionSuccess,
      utils.ajaxError('QuestionStore: failed getting new question')
    );
  },
  onGetQuestionSuccess (data) {
    let response = Immutable.fromJS(data);

    if(response) {
      if(!response.has('error')) {
        console.log('QuestionStore: received new question', response.toJS());

        this.question = response;

        this.trigger({
          question: this.question
        });
      } else {
        console.error('QuestionStore: failed getting new question', response.toJS());
        alert('There was a problem getting the next question. Please refresh the page. If this problem continues, please report the below error message to Taco-Surveyor Support\n\n' + response.get('error'));
      }
    } else {
      console.warn('QuestionStore: response was null getting next question. This likely indicates no available questions rather than an error.');
      this.questionsAvailable = false;
      this.trigger({
        questionsAvailable: this.questionsAvailable
      });
    }
  },
  onSelectAnswer (answerId) {
    console.log('QuestionStore: selecting answer ' + answerId);
    this.selectedAnswerId = answerId;
    this.trigger({
      selectedAnswerId: this.selectedAnswerId
    });
  },
  onSubmitAnswer () {
    console.log('QuestionStore: submitting answer');/*
    utils.ajaxRequest(
      '/submit',
      Immutable.Map({
        answerId: this.selectedAnswerId,
        questionId: this.question.get('id')
      }),
      this.onGetQuestionSuccess,
      utils.ajaxError('QuestionStore: failed getting new question')
    );*/
  },
  onSubmitAnswerSuccess (data) {
    let response = Immutable.fromJS(data);

    if(response) {
      if(!response.has('error')) {
        console.log('QuestionStore: answer submitted successfully', response.toJS());

        this.answer = null;
        this.selectedAnswerId = -1;

        this.trigger({
          answer: this.question,
          selectedAnswerId: this.selectedAnswerId
        });

        this.onGetQuestion();
      } else {
        console.error('QuestionStore: failed submitting answer', response.toJS());
        alert('There was a problem submitting your answer. Please refresh the page. If this problem continues, please report the below error message to Taco-Surveyor Support\n\n' + response.get('error'));
      }
    } else {
      console.error('QuestionStore: failed submitting answer: response was null');
      alert('There was a problem submitting your answer. Please refresh the page. If this problem continues, please report the below error message to Taco-Surveyor Support\n\nError: response was null');
    }
  },
  userStoreChange (something) {
    console.log('I THINK I GET SOMETHING?', something);
  }
});
