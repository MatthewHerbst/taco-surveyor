import React from 'react';
import {Grid} from 'react-bootstrap';

module.exports = React.createClass({
  displayName: 'App',
  propTypes: {
    children: React.PropTypes.shape({
      props: React.PropTypes.object
    })
  },
  render () {
    return (
      <div className={'boggle'}>
        <div className={'boggle-logo'}>
          <img src={'images/logo.png'} />
        </div>
        <Grid className={'boggle-content'}>
          {'Main Grid'}
        </Grid>
      </div>
    );
  }
});
