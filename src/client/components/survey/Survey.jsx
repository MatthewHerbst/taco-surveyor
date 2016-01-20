import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Reflux from 'reflux';
import {Col, Row} from 'react-bootstrap';
import {SurveyActions} from '../../actions';
import {SurveyStore} from '../../stores';
import Question from './Question';

module.exports = React.createClass({
  displayName: 'Survey',
  propTypes: {
    params: React.PropTypes.shape({
      surveyId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
    }).isRequired
  },
  mixins: [PureRenderMixin, Reflux.connect(SurveyStore)],
  componentDidMount () {
    SurveyActions.getSurvey(this.props.params.surveyId);
  },
  componentWillReceiveProps (nextProps) {
    if(this.props.params.surveyId !== nextProps.params.surveyId) {
      SurveyActions.getSurvey(nextProps.params.surveyId);
    }
  },
  render () {
    let survey = this.state.survey;
    let currentQuestion = this.state.currentQuestion;

    return (
      <div>
        <Row>
          <Col md={12}>
            <h2>{'Survey: ' + survey.get('name')}</h2>
            <Question
              answers={currentQuestion.get('Answers')}
              prompt={currentQuestion.get('prompt')}
            />
          </Col>
        </Row>
      </div>
    );
  }
});
