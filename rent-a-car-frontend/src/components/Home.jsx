import React, { Component } from "react";
import { Container, Table, Image, Button } from "react-bootstrap";
import Pagination from "./common/Pagination";
import Hero from "./Hero";
import VehicleService from "../axios/VehicleService";
import jwt_decode from "jwt-decode";
import RentalService from "../axios/RentalService";
import UserService from "../axios/UserService";
import { I18nProvider, LOCALES } from "../i18n";
import { FormattedMessage, IntlProvider } from "react-intl";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageSize: 4,
      vehicles: [],
    };
    this.handleRent = this.handleRent.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("Authorization") != null) {
      var username = jwt_decode(localStorage.getItem("Authorization")).sub;
      UserService.getUserByUsername(username).then((res) => {
        this.setState({ user: res.data });
      });
    }
    VehicleService.getAvailable().then((res) => {
      this.setState({ vehicles: res.data });
    });
  }

  handleRent(vehicleId) {
    let rental = {
      user: { id: this.state.user.id },
      vehicle: { id: vehicleId },
    };
    RentalService.newRental(rental).then((res) => {
      window.location.reload(true);
    });
  }

  render() {
    const { vehicles, currentPage, pageSize } = this.state;
    const carsToDisplay = [...vehicles].splice(
      (currentPage - 1) * pageSize,
      pageSize
    );
    return (
      <React.Fragment>
        <Hero />
        <Container>
          <I18nProvider locale={localStorage.getItem("language")}>
            <Table striped bordered hover className="mt-60">
              <thead>
                <tr>
                  <th>
                    <FormattedMessage id="image" />
                  </th>
                  <th>
                    <FormattedMessage id="model" />
                  </th>
                  <th>
                    <FormattedMessage id="m10r" />
                  </th>
                  <th>
                    <FormattedMessage id="type" />
                  </th>
                  <th>
                    <FormattedMessage id="price" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {carsToDisplay.map((item) => (
                  <tr key={item.id}>
                    <td style={{ width: "25%" }}>
                      <Image
                        src={process.env.PUBLIC_URL + "/car-default.png"}
                        fluid
                      />
                    </td>
                    <td>{item.model}</td>
                    <td>{item.manufacturer}</td>
                    <td>{item.type}</td>
                    <td>{item.price}</td>
                    <td hidden={localStorage.getItem("Authorization") == null}>
                      <Button onClick={() => this.handleRent(item.id)}>
                        <FormattedMessage id="rent" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination
              itemsCount={this.state.vehicles.length}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              onPageChange={this.handlePageChange}
            />
          </I18nProvider>
        </Container>
      </React.Fragment>
    );
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
}

export default Home;
