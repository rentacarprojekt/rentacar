import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Nav, Navbar, NavItem, Container } from "react-bootstrap";
import NotFound from "./NotFound";
import Home from "./Home";

class Navigation extends Component {
  state = {
    theme: "light",
  };
  render() {
    const { theme } = this.state;
    return (
      <React.Fragment>
        <Navbar bg={theme}>
          <Container>
            <Navbar.Brand as={Link} to="/">
              Home
            </Navbar.Brand>
            <Nav className="mr-auto">
              <NavItem>
                <Nav.Link as={Link} to="/about-us">
                  About Us
                </Nav.Link>
              </NavItem>
              <NavItem>
                <Nav.Link as={Link} to="/example1">
                  Example
                </Nav.Link>
              </NavItem>
              <NavItem>
                <Nav.Link as={Link} to="/example2">
                  Example
                </Nav.Link>
              </NavItem>
            </Nav>
            <Nav>
              <NavItem>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </NavItem>
              <NavItem>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </NavItem>
            </Nav>
          </Container>
        </Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Container>
            <Route path="/" component={NotFound} />
          </Container>
        </Switch>
      </React.Fragment>
    );
  }
}

export default Navigation;
