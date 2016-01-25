import Reflux from 'reflux';
import Immutable from 'immutable';
import {UserActions} from '../actions';
import history from '../components/history';
let utils = require('../utils');

module.exports = Reflux.createStore({
  listenables: [UserActions],
  init () {
    this.user = Immutable.Map();
  },
  getInitialState () {
    return {
      user: this.user
    };
  },
  onLogin () {
    if(this.user.has('name')) {
      let username = this.user.get('name');

      if(username) {
        console.log('UserStore: attempting to login user ' + username);
        utils.ajaxRequest(
          '/login',
          Immutable.Map({username: username}),
          this.onLoginSuccess,
          utils.ajaxError('UserStore: attempt to login user ' + username + ' failed')
        );
      }
    }
  },
  onLoginSuccess (data) {
    let response = Immutable.fromJS(data);

    if(response) {
      if(!response.has('error')) {
        console.log('UserStore: received login confirmation', response.toJS());

        this.user = response;

        this.trigger({
          user: this.user
        });

        history.push('/survey');
      } else {
        console.error('UserStore: attempting to login user failed', response.toJS());
        alert('There was a problem trying to log you in. Please refresh the page. If this problem continues, please report the below error message to Taco-Surveyor Support\n\n' + response.get('error'));
      }
    } else {
      console.error('UserStore: failed attempted login: response was null');
      alert('There was a problem trying to log you in. Please refresh the page. If this problem continues, please report the below error message to Taco-Surveyor Support\n\nError: response was null');
    }
  },
  onLogout () {
    console.log('UserStore: attempting to logout user ' + this.user.get('name'));

    // NOTE: no network request right now since we aren't really doing user management
    this.user = this.user.clear();

    this.trigger({
      user: this.user
    });
  },
  onSetUserName (username) {
    console.log('UserStore: setting username to: ' + username);
    this.user = this.user.set('name', username);
    this.trigger({
      user: this.user
    });
  }
});
