import Reflux from 'reflux';
import Immutable from 'immutable';
import {UserActions} from '../actions';
let utils = require('../utils');

module.exports = Reflux.createStore({
  listenables: [UserActions],
  init () {
    this.loggedIn = false;
    this.user = '';
  },
  getInitialState () {
    return {
      loggedIn: this.loggedIn,
      user: this.user
    };
  },
  onLogin (user) {
    if(this.user) {
      console.log('UserStore: attempting to login user ' + user);
      utils.ajaxRequest(
        '/user',
        Immutable.Map({user: user, action: 'login'}),
        this.onLoginSuccess,
        utils.ajaxError('UserStore: attempting to login user failed')
      );
    }
  },
  onLoginSuccess (data) {
    let response = Immutable.fromJS(data);

    if(response) {
      if(!response.has('error')) {
        console.log('UserStore: received login confirmation', response.toJS());

        this.loggedIn = true;

        this.trigger({
          loggedIn: this.loggedIn
        });
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
    console.log('UserStore: attempting to logout user ' + this.user);
    utils.ajaxRequest(
      '/user',
      Immutable.Map({user: this.user, action: 'logout'}),
      this.onLogoutSuccess,
      utils.ajaxError('UserStore: attempting to logout user failed')
    );
  },
  onLogoutSuccess (data) {
    let response = Immutable.fromJS(data);

    if(response) {
      if(!response.has('error')) {
        console.log('UserStore: received logout confirmation', response.toJS());

        this.loggedIn = false;
        this.user = '';

        this.trigger({
          loggedIn: this.loggedIn,
          user: this.user
        });
      } else {
        console.error('UserStore: attempting to logout user failed', response.toJS());
        alert('There was a problem trying to log you out. Please refresh the page. If this problem continues, please report the below error message to Taco-Surveyor Support\n\n' + response.get('error'));
      }
    } else {
      console.error('UserStore: failed attempted logout: response was null');
      alert('There was a problem trying to log you out. Please refresh the page. If this problem continues, please report the below error message to Taco-Surveyor Support\n\nError: response was null');
    }
  },
  onSetUser (user) {
    console.log('UserStore: setting user to: ' + user);
    this.user = user;
    this.trigger({
      user: this.user
    });
  }
});
