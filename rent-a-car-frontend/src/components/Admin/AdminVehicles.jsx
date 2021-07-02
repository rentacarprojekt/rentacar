import { Component } from "react";
import UserService from "../../axios/UserService";
import VehicleService from "../../axios/VehicleService";
import jwt_decode from "jwt-decode";
import {
  InputGroup,
  Table,
  Image,
  Container,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import Pagination from "../common/Pagination";
import EnumService from "../../axios/EnumService";
import { I18nProvider, LOCALES } from "../../i18n";
import { FormattedMessage, IntlProvider } from "react-intl";

class AdminVehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      newImage: null,
      vehicles: [],
      pageSize: 4,
      currentPage: 1,
      showModal: false,
      showModal3: false,
      vehicleId: null,
      newVehicle: {},
      types: [],
      manufacturers: [],
    };
    this.saveChanges = this.saveChanges.bind(this);
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
      VehicleService.getAll().then((res) => {
        this.setState({ vehicles: res.data });
      });
      EnumService.getTypes().then((res) => {
        this.setState({ types: res.data });
      });
      EnumService.getManufacturers().then((res) => {
        this.setState({ manufacturers: res.data });
      });
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  showModal() {
    this.setState({ showModal: true });
  }

  showModal3(rentalDetails) {
    this.setState({ showModal3: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  hideModal3() {
    this.setState({ showModal3: false, newImage: null });
  }

  saveChanges = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    let newVehice = {
      model: form.model.value,
      manufacturer: form.manufacturer.value,
      type: form.type.value,
      mileage: form.mileage.value,
      productionYear: form.productionYear.value,
      price: form.price.value,
    };
    console.log(newVehice);
    VehicleService.newVehicle(newVehice).then((res) => {
      window.location.reload(true);
    });
    this.hideModal();
  };

  deleteVehicle(id) {
    VehicleService.deleteVehicle(id).then((res) => {
      window.location.reload(true);
    });
  }

  fileSelectHandler = event =>{    
    this.setState({ newImage: event.target.files[0] });
  }

  fileUploadHandler = () =>{
    const formData = new FormData();
        formData.append('file', this.state.newImage);
    VehicleService.changeImage(this.state.vehicleId, formData)
  }

  render() {
    const { vehicles, currentPage, pageSize } = this.state;
    const carsToDisplay = [...vehicles].splice(
      (currentPage - 1) * pageSize,
      pageSize
    );
    return (
      <I18nProvider locale={localStorage.getItem("language")}>
        <Container>
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
                  {
                  item.imagePath != null ?
                    <Image className="carPicture" src={item.imagePath} />
                  :
                    <Image
                      src={process.env.PUBLIC_URL + "/car-default.png"}
                      fluid
                    />
                  }
                    
                  </td>
                  <td>{item.model}</td>
                  <td>{item.manufacturer}</td>
                  <td>{item.type}</td>
                  <td>{item.price}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => this.deleteVehicle(item.id)}
                      disabled={!item.available}
                    >
                      <FormattedMessage id="delete" />
                    </Button> <br /> <br />
                    <Button
                      variant="info"
                      onClick={() => {
                        this.setState({vehicleId: item.id})
                        this.showModal3();
                      }}
                    >
                      <FormattedMessage id="change_image" />
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
          <Button
            variant="primary"
            onClick={() => {
              this.showModal();
            }}
          >
            <FormattedMessage id="add_new" />
          </Button>

          <Modal
            show={this.state.showModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                <FormattedMessage id="new_vehicle" />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.saveChanges}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="model" />
                  </Form.Label>
                  <Form.Control name="model" type="text" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="m10r" />
                  </Form.Label>
                  <Form.Control name="manufacturer" as="select">
                    {this.state.manufacturers.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="type" />
                  </Form.Label>
                  <Form.Control name="type" as="select">
                    {this.state.types.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="mileage" />
                  </Form.Label>
                  <Form.Control name="mileage" type="number" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="production_year" />
                  </Form.Label>
                  <Form.Control name="productionYear" type="number" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FormattedMessage id="price" />
                  </Form.Label>
                  <Form.Control name="price" type="number" />
                </Form.Group>
                <Button variant="outline-success" type="submit">
                  <FormattedMessage id="save" />
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
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

export default AdminVehicles;
