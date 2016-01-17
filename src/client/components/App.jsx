import React from 'react';
import {Grid} from 'react-bootstrap';
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
            {this.props.children}
          </Grid>
        </div>
      </div>
    );
  }
});
