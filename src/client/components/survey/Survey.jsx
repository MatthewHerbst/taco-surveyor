import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Col, Row} from 'react-bootstrap';
import Question from './Question';

module.exports = React.createClass({
  displayName: 'Survey',
  mixins: [PureRenderMixin],
  render () {
    return (
      <div>
        <Row>
          <Col md={8} mdOffset={2}>
            <h2>{'Taco Knowledge Survey'}</h2>
            <Question />
          </Col>
        </Row>
      </div>
    );
  }
});
