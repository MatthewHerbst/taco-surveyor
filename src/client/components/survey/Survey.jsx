import React from 'react';
import Reflux from 'reflux';
import {SurveyStore} from '../../stores';

module.exports = React.createClass({
  displayName: 'Survey',
  mixins: [Reflux.connectStore(SurveyStore)],
  render () {
    return (
      <div>{'I am Survey'}</div>
    );
  }
});
