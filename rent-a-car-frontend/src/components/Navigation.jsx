import React, { Component } from "react";
import { Route, Switch, Link, withRouter } from "react-router-dom";
import {
  Nav,
  Navbar,
  NavItem,
  Container,
  NavDropdown,
  Button,
} from "react-bootstrap";
import NotFound from "./NotFound";
import Home from "./Home";
import UserProfile from "./User/UserProfile";
import LoginForm from "../login/LoginForm";
import AdminUsers from "./Admin/AdminUsers";
import AdminVehicles from "./Admin/AdminVehicles";
import jwt_decode from "jwt-decode";
import RegisterForm from "../register/RegisterForm";
import { I18nProvider, LOCALES } from "../i18n";
import { FormattedMessage, IntlProvider } from "react-intl";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: localStorage.getItem("language"),
    };
    /*  localStorage.setItem('Authorization', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoZ2R4ZmFzZGh0IiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTYyNDA0MjM2NH0.R9TgVXXTNSfRprCNMjoTDPGsHPBLS0ze0fl0R4VWpMfqnOe2dQTthYIVhxZoHiGSIWjtwJzKku6dkA2HHMzl9w'); */
    if (localStorage.getItem("language") == null) {
      localStorage.setItem("language", LOCALES.CROATIAN);
    }
    this.logout = this.logout.bind(this);
  }

  onLanguageChanged = (e) => {
    e.preventDefault();
    if (localStorage.getItem("language") == LOCALES.CROATIAN) {
      localStorage.setItem("language", LOCALES.ENGLISH);
      this.setState({ label: LOCALES.CROATIAN });
    } else {
      localStorage.setItem("language", LOCALES.CROATIAN);
      this.setState({ label: LOCALES.ENGLISH });
    }
  };

  logout() {
    localStorage.removeItem("Authorization");
    this.props.history.push("/");
  }

  render() {
    const { theme } = this.state;
    return (
      <React.Fragment>
        <Navbar>
          <I18nProvider locale={localStorage.getItem("language")}>
            <Container>
              <Navbar.Brand as={Link} to="/">
                <FormattedMessage id="home" />
              </Navbar.Brand>
              <Nav className="mr-auto">
                <NavItem>
                  <Nav.Link as={Link} to="/about-us">
                    <FormattedMessage id="about_us" />
                  </Nav.Link>
                </NavItem>
                <NavItem>
                  <Nav.Link
                    as={Link}
                    to="/profile"
                    hidden={localStorage.getItem("Authorization") == null}
                  >
                    <FormattedMessage id="profile" />
                  </Nav.Link>
                </NavItem>
                <NavItem>
                  <Nav.Link as={Link} to="/example2">
                    <FormattedMessage id="example" />
                  </Nav.Link>
                </NavItem>
                <NavDropdown
                  title="Admin"
                  id="nav-dropdown"
                  hidden={
                    localStorage.getItem("Authorization") == null
                      ? true
                      : jwt_decode(localStorage.getItem("Authorization"))
                          .auth != "ROLE_ADMIN"
                  }
                >
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to="/admin-users">
                      <FormattedMessage id="users" />
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to="/admin-vehicles">
                      <FormattedMessage id="vehicles" />
                    </Nav.Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav hidden={localStorage.getItem("Authorization") == null}>
                <NavItem>
                  <Button onClick={this.logout}>
                    <FormattedMessage id="logout" />
                  </Button>
                </NavItem>
              </Nav>
              <Nav hidden={localStorage.getItem("Authorization") != null}>
                <NavItem>
                  <Nav.Link as={Link} to="/login">
                    <FormattedMessage id="login" />
                  </Nav.Link>
                </NavItem>
                <NavItem>
                  <Nav.Link as={Link} to="/register">
                    <FormattedMessage id="register" />
                  </Nav.Link>
                </NavItem>
              </Nav>
              <Nav>
                <NavItem>
                  <Button
                    onClick={this.onLanguageChanged}
                    className="lbtn ml-3"
                  >
                    {this.state.label}
                  </Button>
                </NavItem>
              </Nav>
            </Container>
          </I18nProvider>
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
