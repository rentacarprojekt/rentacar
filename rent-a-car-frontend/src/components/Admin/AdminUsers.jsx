import { Component } from "react";
import UserService from "../../axios/UserService";
import jwt_decode from "jwt-decode";
import { Container, InputGroup, Table, FormControl } from "react-bootstrap";
import { I18nProvider, LOCALES } from "../../i18n";
import { FormattedMessage, IntlProvider } from "react-intl";

class AdminUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      users: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("Authorization") == null)
      this.props.history.push("/");
    else if (
      jwt_decode(localStorage.getItem("Authorization")).auth != "ROLE_ADMIN"
    )
      this.props.history.push("/");
    else {
      var username = jwt_decode(localStorage.getItem("Authorization")).sub;
      UserService.getUserByUsername(username).then((res) => {
        this.setState({ user: res.data });
      });
      UserService.getUsers().then((res) => {
        this.setState({ users: res.data });
      });
    }
  }

  handleChange(username) {
    var tempUser;
    UserService.getUserByUsername(username).then((res) => {
      tempUser = res.data;
      if (tempUser.role == "ROLE_ADMIN") tempUser.role = "ROLE_USER";
      else tempUser.role = "ROLE_ADMIN";
      UserService.updateUser(tempUser).then((res) => {
        console.log("here");
        UserService.getUsers().then((res) => {
          this.setState({ users: res.data });
        });
      });
    });
  }

  render() {
    return (
      <Container>
        <I18nProvider locale={localStorage.getItem("language")}>
          <Table striped bordered hover className="mt-60">
            <thead>
              <tr>
                <th>
                  <FormattedMessage id="username" />
                </th>
                <th>
                  <FormattedMessage id="full_name" />
                </th>
                <th>
                  <FormattedMessage id="email" />
                </th>
                <th>
                  <FormattedMessage id="address" />
                </th>
                <th>
                  <FormattedMessage id="phone" />
                </th>
                <th>
                  <FormattedMessage id="bio" />
                </th>
                <th>
                  <FormattedMessage id="admin" />
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((item) => (
                <tr key={item.username}>
                  <td>{item.username}</td>
                  <td>{item.firstName + " " + item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                  <td>{item.bio}</td>
                  <td>
                    <InputGroup>
                      <InputGroup.Checkbox
                        checked={item.role == "ROLE_ADMIN"}
                        onChange={() => this.handleChange(item.username)}
                        disabled={
                          this.state.user.username == item.username
                            ? true
                            : false
                        }
                      />
                    </InputGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </I18nProvider>
      </Container>
    );
  }
}

export default AdminUsers;
