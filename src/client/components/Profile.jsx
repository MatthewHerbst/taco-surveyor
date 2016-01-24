import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Reflux from 'reflux';
import {Col, Row} from 'react-bootstrap';
import {ProfileActions} from '../actions';
import {ProfileStore} from '../stores';

module.exports = React.createClass({
  displayName: 'Profile',
  mixins: [PureRenderMixin, Reflux.connect(ProfileStore)],
  componentDidMount () {
    ProfileActions.getProfile();
  },
  render () {
    return (
      <diw>
        <Row>
          <Col md={8} mdOffset={2}>
            <p>{'Awesome things happen when Warlords eat their Tacos. Click on \'Surveys\' above to see if you have Bad A** powers.'}</p>
          </Col>
        </Row>
        <Row>
          <Col md={8} mdOffset={2}>
            <p>{'Made with a healthy pinch of tortilla, carne, salsa verde, pico de gallo, guacamole, and queso by Matthew Herbst'}</p>
            <p><a href={'https://github.com/MatthewHerbst'}>{'GitHub'}</a></p>
            <p><a href={'stackoverflow.com/users/2518231/MatthewHerbst'}>{'#SOReadyToHelp'}</a></p>
            <p><a href={'https://twitter.com/MattHerbst_'}>{'@MattHerbst_'}</a></p>
          </Col>
        </Row>
      </diw>
    );
  }
});
