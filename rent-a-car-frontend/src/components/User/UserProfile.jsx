import React, { Component } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import UserService from "../../axios/UserService";
import RentalService from "../../axios/RentalService";
import { Image, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faUser);

class UserProfile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            rentals: [],
            user: {},
            showModal: false,
            editedUser: {}
        }
        this.handleBioChange = this.handleBioChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
      }

    handleBioChange = (event) => {
        this.setState({editedUser: {...this.state.editedUser, bio: event.target.value}});
    }
    handlePhoneChange = (event) => {
        this.setState({editedUser: {...this.state.editedUser, phoneNumber: event.target.value}});
    }
    handleAddressChange = (event) => {
        this.setState({editedUser: {...this.state.editedUser, address: event.target.value}});
    }

    componentDidMount() {
        var username = jwt_decode(localStorage.getItem('Authorization')).sub;
        RentalService.getRentalsForUsername(username).then(res => {
            this.setState({rentals: res.data})
        });
        UserService.getUserByUsername(username).then(res => {
            this.setState({user: res.data})
        });
    }

    showModal(){
        this.setState({editedUser: this.state.user});
        this.setState({showModal: true});
    }

    hideModal(){
        this.setState({showModal: false});
    }

    saveChanges(){
        var username = jwt_decode(localStorage.getItem('Authorization')).sub;
        UserService.updateUser(this.state.editedUser).then(res => {
            UserService.getUserByUsername(username).then(res => {
                this.setState({user: res.data})
            });
        });
        this.hideModal();
    }

    render() {
        return(
            <Container>
                <Row>
                    <Col className="text-center mt-60">
                        <FontAwesomeIcon icon="user" size="9x" />
                        <br/><br/>
                        <h3>{this.state.user.username}</h3>
                        <Table borderless className="w-50">
                            <tbody>
                                <tr>
                                    <td>Full name:</td>
                                    <td>{this.state.user.firstName + " " + this.state.user.lastName}</td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>{this.state.user.email}</td>
                                </tr>
                                <tr>
                                    <td>Address:</td>
                                    <td>{this.state.user.address}</td>
                                </tr>
                                <tr>
                                    <td>Phone number:</td>
                                    <td>{this.state.user.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td>Bio:</td>
                                    <td>{this.state.user.bio}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Button variant="outline-info" onClick={() => {this.showModal()}}>Edit Info</Button>
                    </Col>
                    <Col s = {9} className="text-center mt-60">
                        <h2>Rented vehicles</h2>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>Model</th>
                                <th>Manufacturer</th>
                                <th>Type</th>
                                <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.rentals.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.vehicle.model}</td>
                                    <td>{item.vehicle.manufacturer}</td>
                                    <td>{item.vehicle.type}</td>
                                    <td>{item.vehicle.price}</td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Modal show={this.state.showModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            My Info
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" value={this.state.editedUser.firstName} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" value={this.state.editedUser.lastName} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" value={this.state.editedUser.username} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={this.state.editedUser.email} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" value={this.state.editedUser.address} onChange={this.handleAddressChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control name="bio" type="text" value={this.state.editedUser.phoneNumber} onChange={this.handlePhoneChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Bio</Form.Label>
                                <Form.Control as="textarea" value={this.state.editedUser.bio} onChange={this.handleBioChange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-success" onClick={() => { this.saveChanges() }}>Save</Button> <Button variant="outline-danger" onClick={() => { this.hideModal() }}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }

}
export default UserProfile