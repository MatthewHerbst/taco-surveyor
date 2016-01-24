import Reflux from 'reflux';
import Immutable from 'immutable';
import {ProfileActions} from '../actions';
let utils = require('../utils');

module.exports = Reflux.createStore({
  listenables: [ProfileActions],
  init () {
    this.answers = Immutable.List();
    this.user = '';
  },
  getInitialState () {
    return {
      answers: this.answers
    };
  },
  onGetProfile () {
    console.log('ProfileStore: getting answers');
    utils.ajaxRequest(
      '/profile',
      Immutable.Map(),
      this.onGetProfileSuccess,
      utils.ajaxError('ProfileStore: getting answers failed')
    );
  },
  onGetProfileSuccess (data) {
    let response = Immutable.fromJS(data);

    if(response) {
      if(!response.has('error')) {
        console.log('ProfileStore: received answers', response.toJS());

        this.answers = response;

        this.trigger({
          answers: this.answers
        });
      } else {
        console.error('ProfileStore: getting answers failed', response.toJS());
        alert('There was a problem getting your answer history. Please refresh the page. If this problem continues, please report the below error message to Taco-Surveyor Support\n\n' + response.get('error'));
      }
    } else {
      console.error('ProfileStore: failed getting answers: response was null');
      alert('There was a problem getting your answer history. Please refresh the page. If this problem continues, please report the below error message to Taco-Surveyor Support\n\nError: response was null');
    }
  },
  onSetUser (user) {
    this.user = user;
    this.onGetProfile();
  }
});
