import React from 'react';
import Reflux from 'reflux';
import {SurveyListStore} from '../../stores';

module.exports = React.createClass({
  displayName: 'SurveyList',
  mixins: [Reflux.connectStore(SurveyListStore)],
  render () {
    return (
      <div>{'I am SurveyList'}</div>
    );
  }
});
