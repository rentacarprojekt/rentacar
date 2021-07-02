import React, { Component } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import UserService from "../../axios/UserService";
import RentalService from "../../axios/RentalService";
import { Image, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { I18nProvider, LOCALES } from "../../i18n";
import { FormattedMessage, IntlProvider } from "react-intl";

library.add(faUser);

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rentals: [],
      user: {},      
      newImage: null,
      showModal: false,
      showModal2: false,
      showModal3: false,
      editedUser: {},
      rental: {
        vehicle: {
          model: "",
          manufacturer: "",
          type: "",
          mileage: "",
          productionYear: "",
          price: "",
        },
        dateFrom: "",
        returnDate: "",
      },
    };
    this.handleBioChange = this.handleBioChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleRent = this.handleRent.bind(this);
  }

  handleBioChange = (event) => {
    this.setState({
      editedUser: { ...this.state.editedUser, bio: event.target.value },
    });
  };
  handlePhoneChange = (event) => {
    this.setState({
      editedUser: { ...this.state.editedUser, phoneNumber: event.target.value },
    });
  };
  handleAddressChange = (event) => {
    this.setState({
      editedUser: { ...this.state.editedUser, address: event.target.value },
    });
  };

  componentDidMount() {
    if (localStorage.getItem("Authorization") == null)
      this.props.history.push("/");
    else {
      var username = jwt_decode(localStorage.getItem("Authorization")).sub;
      RentalService.getRentalsForUsername(username).then((res) => {
        this.setState({ rentals: res.data });
      });
      UserService.getUserByUsername(username).then((res) => {
        this.setState({ user: res.data });
      });
    }
  }

  showModal() {
    this.setState({ editedUser: this.state.user });
    this.setState({ showModal: true });
  }

  showModal2(rentalDetails) {
    this.setState({ editedUser: this.state.user });
    this.setState({ rental: rentalDetails });
    this.setState({ showModal2: true });
  }

  showModal3(rentalDetails) {
    this.setState({ showModal3: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  hideModal2() {
    this.setState({ showModal2: false });
  }

  hideModal3() {
    this.setState({ showModal3: false, newImage: null });
  }

  saveChanges() {
    var username = jwt_decode(localStorage.getItem("Authorization")).sub;
    UserService.updateUser(this.state.editedUser).then((res) => {
      UserService.getUserByUsername(username).then((res) => {
        this.setState({ user: res.data });
      });
    });
    this.hideModal();
  }

  handleRent(rentalId, userId, vehicleId) {
    let rental = {
      id: rentalId,
      user: { id: userId },
      vehicle: { id: vehicleId },
    };
    RentalService.returnVehicle(rental).then((res) => {
      window.location.reload(true);
    });
  }

  fileSelectHandler = event =>{    
    this.setState({ newImage: event.target.files[0] });
  }

  fileUploadHandler = () =>{
    const formData = new FormData();
        formData.append('file', this.state.newImage);
    UserService.changeImage(this.state.user.username, formData)
  }

  render() {
    return (
      <I18nProvider locale={localStorage.getItem("language")}>
        <Container>
          <Row>
            <Col className="text-center mt-60">
              {
              (this.state.user.imagePath != null && this.state.user.imagePath != "") ?
                <Image className="profilePicture" src={this.state.user.imagePath} />
              :
                <FontAwesomeIcon icon="user" size="9x" />
              }
              <br />
              <br />
              <Button
                variant="outline-info"
                onClick={() => {
                  this.showModal3();
                }}
              ><FormattedMessage id="change_profile_picture" /></Button>
              <br />
              <br />
              <h3>{this.state.user.username}</h3>
              <Table borderless className="w-50">
                <tbody>
                  <tr>
                    <td>
                      <FormattedMessage id="full_name" />:
                    </td>
                    <td>
                      {this.state.user.firstName +
                        " " +
                        this.state.user.lastName}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FormattedMessage id="email" />:
                    </td>
                    <td>{this.state.user.email}</td>
                  </tr>
                  <tr>
                    <td>
                      <FormattedMessage id="address" />:
                    </td>
                    <td>{this.state.user.address}</td>
                  </tr>
                  <tr>
                    <td>
                      <FormattedMessage id="phone" />:
                    </td>
                    <td>{this.state.user.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td>
                      <FormattedMessage id="bio" />:
                    </td>
                    <td>{this.state.user.bio}</td>
                  </tr>
                </tbody>
              </Table>
              <Button
                variant="outline-info"
                onClick={() => {
                  this.showModal();
                }}
              >
                <FormattedMessage id="edit_info" />
              </Button>
            </Col>
            <Col s={9} className="text-center mt-60">
              <h2>
                <FormattedMessage id="rented_vehicles" />
              </h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
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
                  {this.state.rentals.map((item) => (
                    <tr key={item.id}>
                      <td>{item.vehicle.model}</td>
                      <td>{item.vehicle.manufacturer}</td>
                      <td>{item.vehicle.type}</td>
                      <td>{item.vehicle.price}</td>
                      <td>
                        <Button
                          hidden={item.returnDate != null}
                          onClick={() =>
                            this.handleRent(
                              item.id,
                              item.user.id,
                              item.vehicle.id
                            )
                          }
                        >
                          <FormattedMessage id="return" />
                        </Button>
                        <Button
                          variant="outline-primary"
                          hidden={item.returnDate == null}
                          onClick={() => this.showModal2(item)}
                        >
                          <FormattedMessage id="details" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Modal
            show={this.state.showModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                <FormattedMessage id="my_info" />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="first_name" />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.editedUser.firstName}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="last_name" />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.editedUser.lastName}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="username" />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.editedUser.username}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="email" />
                  </Form.Label>
                  <Form.Control
                    type="email"
                    value={this.state.editedUser.email}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="address" />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.editedUser.address}
                    onChange={this.handleAddressChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="phone" />
                  </Form.Label>
                  <Form.Control
                    name="bio"
                    type="text"
                    value={this.state.editedUser.phoneNumber}
                    onChange={this.handlePhoneChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="bio" />
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    value={this.state.editedUser.bio}
                    onChange={this.handleBioChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-success"
                onClick={() => {
                  this.saveChanges();
                }}
              >
                <FormattedMessage id="save" />
              </Button>{" "}
              <Button
                variant="outline-danger"
                onClick={() => {
                  this.hideModal();
                }}
              >
                <FormattedMessage id="cancel" />
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={this.state.showModal2}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                <FormattedMessage id="rental_info" />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="model" />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.rental.vehicle.model}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="m10r" />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.rental.vehicle.manufacturer}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="type" />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.rental.vehicle.type}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="mileage" />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.rental.vehicle.mileage}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="production_year" />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.rental.vehicle.productionYear}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="price" />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.rental.vehicle.price}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="rental_date" />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.rental.dateFrom}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="return_date" />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.rental.returnDate}
                    disabled
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-danger"
                onClick={() => {
                  this.hideModal2();
                }}
              >
                <FormattedMessage id="close" />
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={this.state.showModal3}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                <FormattedMessage id="change_profile_picture" />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="image" />
                  </Form.Label>
                  <Form.Control
                    type="file"
                    onChange={this.fileSelectHandler}
                  />
                </Form.Group>
              </Form>
              <Button
                variant="outline-success"
                onClick={
                  this.fileUploadHandler
                }
                disabled={this.state.newImage == null ? true:false }
              ><FormattedMessage id="change" /></Button>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-danger"
                onClick={() => {
                  this.hideModal3();
                }}
              >
                <FormattedMessage id="close" />
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </I18nProvider>
    );
  }
}
export default UserProfile;
