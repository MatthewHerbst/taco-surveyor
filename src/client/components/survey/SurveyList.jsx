import React from 'react';
import Reflux from 'reflux';
import {Col, ListGroup, ListGroupItem, Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {SurveyListStore} from '../../stores';

module.exports = React.createClass({
  displayName: 'SurveyList',
  mixins: [Reflux.connect(SurveyListStore)],
  render () {
    let surveys = this.state.surveys.map((survey, i) => {
      return (
        <LinkContainer
          key={survey.get('id')}
          eventKey={i}
          to={'/survey'}
          query={{surveyId: survey.get('id')}}
        >
          <ListGroupItem>{survey.get('name')}</ListGroupItem>
        </LinkContainer>
      );
    });

    return (
      <div>
        <Row>
          <Col md={8} mdOffset={2}>
            <h2>{'Choose a survey to test your lunch skills'}</h2>
            <ListGroup>
              {surveys}
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
});
