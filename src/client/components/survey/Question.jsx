import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ImmutablePropTypes from 'react-immutable-proptypes';

module.exports = React.createClass({
  displayName: 'Question',
  propTypes: {
    answers: ImmutablePropTypes.list.isRequired,
    prompt: React.PropTypes.string.isRequired
  },
  mixins: [PureRenderMixin],
  render () {
    return (
      <div>{'I am question'}</div>
    );
  }
});
