import React, { Component } from "react";
import { Container } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import UserService from "../../axios/UserService";
import RentalService from "../../axios/RentalService";
import { Image, Table } from "react-bootstrap";

class UserProfile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            rentals: []
        };
      }

    componentDidMount() {
        RentalService.getRentalsForUsername('bpavic').then(res => {
            console.log("data:" + res.data)
            this.setState({rentals: res.data})
        });
    }

    render() {
        return(
            <Container>
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
            </Container>
        );
      }

}
export default UserProfile