import React from 'react';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';

module.exports = React.createClass({
  displayName: 'Nav',
  render () {
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
        <Nav pullRight className={'top-nav'}>
          <IndexLinkContainer eventKey={1} to={'/'} activeClassName={'active'}>
            <NavItem>{'Home'}</NavItem>
          </IndexLinkContainer>
          <LinkContainer eventKey={2} to={'/about'} activeClassName={'active'}>
            <NavItem>{'About'}</NavItem>
          </LinkContainer>
          <LinkContainer eventKey={3} to={'/surveys'} activeClassName={'active'}>
            <NavItem>{'Surveys'}</NavItem>
          </LinkContainer>
          <LinkContainer eventKey={4} to={'/admin'} activeClassName={'active'}>
            <NavItem>{'Admin'}</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    );
  }
});
