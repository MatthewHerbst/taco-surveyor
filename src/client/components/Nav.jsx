import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Reflux from 'reflux';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';
import {UserStore} from '../stores';

module.exports = React.createClass({
  displayName: 'Nav',
  mixins: [PureRenderMixin, Reflux.connect(UserStore)],
  render () {
    let state = this.state;

    let userOptions = null;
    if(state.loggedIn) {
      let adminOption = null;
      if(state.user === 'admin') {
        adminOption = (
          <LinkContainer eventKey={3} to={'/admin'} activeClassName={'active'}>
            <NavItem>{'Admin'}</NavItem>
          </LinkContainer>
        );
      }

      userOptions = (
        <div>
          <IndexLinkContainer eventKey={1} to={'/'} activeClassName={'active'}>
            <NavItem>{'Home'}</NavItem>
          </IndexLinkContainer>
          <LinkContainer eventKey={2} to={'/profile'} activeClassName={'active'}>
            <NavItem>{'My Profile'}</NavItem>
          </LinkContainer>
          <LinkContainer eventKey={adminOption === null ? 3 : 4} to={'/login'} query={{logout: true}} activeClassName={'active'}>
            <NavItem>{'Logout'}</NavItem>
          </LinkContainer>
          {adminOption}
        </div>
      );
    } else {
      userOptions = (<NavItem>{'Please login!'}</NavItem>);
    }

    return (
      <Navbar inverse fixedTop className={'top-nav'}>
        <Navbar.Header>
          <IndexLinkContainer to={'/'} activeClassName={'active'}>
            <Navbar.Brand>
              {'Taco Surveyor'}
            </Navbar.Brand>
          </IndexLinkContainer>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight className={'top-nav'}>
            {userOptions}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
});
