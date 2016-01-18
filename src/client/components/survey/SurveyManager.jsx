import React from 'react';
import Reflux from 'reflux';
import {SurveyStore} from '../../stores';

module.exports = React.createClass({
  displayName: 'SurveyManager',
  mixins: [Reflux.connectStore(SurveyStore)],
  render () {
    return (
      <div>{'I am SurveyManager'}</div>
    );
  }
});
