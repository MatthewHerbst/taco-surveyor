import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Reflux from 'reflux';
import {Col, Button, Input, Row} from 'react-bootstrap';
import {UserActions} from '../actions';
import {UserStore} from '../stores';

module.exports = React.createClass({
  displayName: 'Login',
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  mixins: [PureRenderMixin, Reflux.connect(UserStore)],
  handleLoginSubmit () {
    console.log('Login: login button clicked');
    UserActions.login();
  },
  handleUserChange () {
    console.log('Login: setting username to: ' + this.username.getValue());
    UserActions.setUserName(this.username.getValue());
  },
  _username (ref) {
    this.username = ref;
  },
  render () {
    let state = this.state;

    let userNameValid = state.user.has('name') &&  state.user.get('name');
    const innerSubmit = (
      <Button
        bsStyle={userNameValid ? 'success' : 'danger'}
        onClick={this.handleLoginSubmit}
      >
        {userNameValid ? 'Login' : 'Enter User Name'}
      </Button>
    );

    return (
      <Row>
        <Col md={6} mdOffset={3}>
          <h3>{'Please Login'}</h3>
          <Input
            buttonAfter={innerSubmit}
            bsSize={'large'}
            onChange={this.handleUserChange}
            placeholder={'Enter user name'}
            ref={this._username}
            type={'text'}
          />
        </Col>
      </Row>
    );
  }
});
