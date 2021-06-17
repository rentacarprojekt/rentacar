import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Nav, Navbar, NavItem, Container, NavDropdown} from "react-bootstrap";
import NotFound from "./NotFound";
import Home from "./Home";
import UserProfile from "./User/UserProfile";
import AdminUsers from "./Admin/AdminUsers";

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
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
              </NavItem>
              <NavItem>
                <Nav.Link as={Link} to="/example2">
                  Example
                </Nav.Link>
              </NavItem>
              <NavDropdown title="Admin" id="nav-dropdown">
                <NavDropdown.Item>
                  <Nav.Link as={Link} to="/admin-users">
                    Users
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link as={Link} to="/admin-vehicles">
                    Vehicles
                  </Nav.Link>
                </NavDropdown.Item>
              </NavDropdown>
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
          <Route exact path="/profile" component={UserProfile} />
          <Route exact path="/admin-users" component={AdminUsers} />
          <Container>
            <Route path="/" component={NotFound} />
          </Container>
        </Switch>
      </React.Fragment>
    );
  }
}

export default Navigation;
