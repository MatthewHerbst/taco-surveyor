import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Reflux from 'reflux';
import {Col, Button, Input, Row} from 'react-bootstrap';
import {UserActions} from '../actions';
import {UserStore} from '../stores';

module.exports = React.createClass({
  displayName: 'Login',
  propTypes: {
    children: React.PropTypes.shape({
      props: React.PropTypes.object
    })
  },
  mixins: [PureRenderMixin, Reflux.connect(UserStore)],
  handleLoginSubmit () {
    console.log('Login: login button clicked');
    UserActions.login();
  },
  handleUserChange () {
    console.log('Login: setting user to: ' + this.username.getValue());
    UserActions.setUser(this.username.getValue());
  },
  _username (ref) {
    this.username = ref;
  },
  render () {
    let state = this.state;

    if(state.loggedIn) {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }

    const innerSubmit = (
      <Button
        bsStyle={state.user === '' ? 'danger' : 'success'}
        onClick={this.handleLoginSubmit}
      >
        {state.user === '' ? 'Enter User Name' : 'Login'}
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
