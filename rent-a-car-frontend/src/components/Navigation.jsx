import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Nav, Navbar, NavItem, Container, NavDropdown} from "react-bootstrap";
import NotFound from "./NotFound";
import Home from "./Home";
import UserProfile from "./User/UserProfile";
import LoginForm from "../login/LoginForm";
import RegisterForm from "../register/RegisterForm";
import { LOCALES } from "../i18n";
import AdminUsers from "./Admin/AdminUsers";
import AdminVehicles from "./Admin/AdminVehicles";

class Navigation extends Component {
  state = {
    theme: "light",
  };

  constructor(props) {
    super(props);
    /*  localStorage.setItem('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpem92a2ljOTgiLCJhdXRoIjoiUk9MRV9BRE1JTiIsImV4cCI6MTYyMzk4ODk1MH0.VM_tvn830af7cvTJxoeb80kgyVDiQUvC7fVnDrAVnuZ5D2XN25cYjAw5Z13e2n7UvEIXJBDupfG2v1VxIKNH6Q'); */
    if (localStorage.getItem("language") == null) {
      localStorage.setItem('language', LOCALES.CROATIAN);
    }


  }

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
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/admin-users" component={AdminUsers} />
          <Route exact path="/admin-vehicles" component={AdminVehicles} />
          <Container>
            <Route path="/" component={NotFound} />
          </Container>
        </Switch>
      </React.Fragment>
    );
  }
}

export default Navigation;
