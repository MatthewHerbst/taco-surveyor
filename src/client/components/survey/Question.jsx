import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Reflux from 'reflux';
import {Alert, ButtonInput, Col, Input, Panel, ProgressBar, Row} from 'react-bootstrap';
import {QuestionActions} from '../../actions';
import {QuestionStore} from '../../stores';

module.exports = React.createClass({
  displayName: 'Question',
  mixins: [PureRenderMixin, Reflux.connect(QuestionStore)],
  componentDidMount () {
    QuestionActions.getQuestion();
  },
  handleAnswerSelect (answerId) {
    return () => {
      console.log('Question: selected answer ' + answerId);
      QuestionActions.selectAnswer(answerId);
    };
  },
  handleQuestionSubmit () {
    console.log('Question: submit button clicked');
    if(this.state.selectedAnswer) {
      QuestionActions.submitAnswer();
    }
  },
  render () {
    let state = this.state;

    let question = null;
    if(state.questionsAvailable) {
      if(state.question) {
        let answers = state.question.get('Answers').map((answer, i) => {
          return (
            <Input
              key={i}
              checked={answer.get('id') === state.selectedAnswerId ? true : null}
              label={answer.get('answer')}
              onClick={this.handleAnswerSelect(answer.get('id'))}
              type={'radio'}
            />
          );
        });

        question = (
          <Panel
            bsStyle={'primary'}
            header={state.question.get('prompt')}
          >
            {answers}
            <ButtonInput
              bsStyle={state.selectedAnswerId === -1 ? 'danger' : 'success'}
              onClick={this.handleQuestionSubmit}
              value={state.selectedAnswerId === -1 ? 'Please Select an Answer' : 'Submit Answer'}
            />
          </Panel>
        );
      } else {
        question = (
          <ProgressBar active now={50} />
        );
      }
    } else {
      question = (
        <Alert bsStyle={'warning'}>
          <strong>{'Oh Tacos! '}</strong>{'You\'ve answered every available question! Check back later for more.'}
        </Alert>
      );
    }

    return (
      <Row>
        <Col md={12}>
          {question}
        </Col>
      </Row>
    );
  }
});
