import React from 'react';
import {Grid} from 'react-bootstrap';
import Login from './Login';
import Nav from './Nav';

module.exports = React.createClass({
  displayName: 'App',
  propTypes: {
    children: React.PropTypes.shape({
      props: React.PropTypes.object
    })
  },
  render () {
    return (
      <div className={'taco-surveyor'} id={'wrapper'}>
        <Nav />
        <div className={'taco-surveyor-content'} id={'page-wrapper'}>
          <Grid fluid>
            <Login />
          </Grid>
        </div>
      </div>
    );
  }
});
