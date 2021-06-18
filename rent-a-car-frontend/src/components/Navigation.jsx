import React, { Component } from "react";
import { Route, Switch, Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem, Container, NavDropdown, Button} from "react-bootstrap";
import NotFound from "./NotFound";
import Home from "./Home";
import UserProfile from "./User/UserProfile";
import LoginForm from "../login/LoginForm";
import { LOCALES } from "../i18n";
import AdminUsers from "./Admin/AdminUsers";
import AdminVehicles from "./Admin/AdminVehicles";
import jwt_decode from "jwt-decode";
import RegisterForm from "../register/RegisterForm";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    /*  localStorage.setItem('Authorization', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoZ2R4ZmFzZGh0IiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTYyNDA0MjM2NH0.R9TgVXXTNSfRprCNMjoTDPGsHPBLS0ze0fl0R4VWpMfqnOe2dQTthYIVhxZoHiGSIWjtwJzKku6dkA2HHMzl9w'); */
    if (localStorage.getItem("language") == null) {
      localStorage.setItem('language', LOCALES.CROATIAN);
    }
    this.logout = this.logout.bind(this);
  }

  logout(){
    localStorage.removeItem('Authorization');
    this.props.history.push('/');
  }

  render() {
    const { theme } = this.state;
    return (
      <React.Fragment>
        <Navbar>
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
                <Nav.Link as={Link} to="/profile" hidden={localStorage.getItem('Authorization') == null}>
                  Profile
                </Nav.Link>
              </NavItem>
              <NavItem>
                <Nav.Link as={Link} to="/example2">
                  Example
                </Nav.Link>
              </NavItem>
              <NavDropdown title="Admin" id="nav-dropdown" hidden={localStorage.getItem('Authorization') == null ? true : jwt_decode(localStorage.getItem('Authorization')).auth != 'ROLE_ADMIN'}>
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
            <Nav hidden={localStorage.getItem('Authorization') == null}>
              <NavItem>
                <Button onClick = {this.logout}>
                  Logout
                </Button>
              </NavItem>
            </Nav>
            <Nav hidden={localStorage.getItem('Authorization') != null}>
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

export default withRouter(Navigation);
