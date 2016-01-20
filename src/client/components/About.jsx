import React from 'react';
import {Col, Row} from 'react-bootstrap';

module.exports = React.createClass({
  displayName: 'About',
  render () {
    return (
      <diw>
        <Row>
          <Col md={8} mdOffset={2}>
            <p>{'Awesome things happen when Warloards eat their Tacos. Click on \'Surveys\' above to see if you have Bad A** powers.'}</p>
          </Col>
        </Row>
        <Row>
          <Col md={8} mdOffset={2}>
            <p>{'Respectively brought to you by Matthew Herbst'}</p>
            <p><a href={'https://github.com/MatthewHerbst'}>{'GitHub'}</a></p>
            <p><a href={'stackoverflow.com/users/2518231/MatthewHerbst'}>{'#SOReadyToHelp'}</a></p>
            <p><a href={'https://twitter.com/MattHerbst_'}>{'@MattHerbst_'}</a></p>
          </Col>
        </Row>
      </diw>
    );
  }
});
