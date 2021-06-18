import React, { Component } from "react";
import { Container, Table, Image, Button } from "react-bootstrap";
import CarFilter from "./CarFilter";
import CarTable from "./CarTable";
import Pagination from "./common/Pagination";
import Hero from "./Hero";
import getCars from "../fakeRepository/cars";
import VehicleService from "../axios/VehicleService";
import jwt_decode from "jwt-decode";
import RentalService from "../axios/RentalService";
import UserService from "../axios/UserService";

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {      
      currentPage: 1,
      pageSize: 4,
      vehicles: []
    }
    this.handleRent = this.handleRent.bind(this)
  }

  componentDidMount(){
    if(localStorage.getItem('Authorization')!=null){
      var username = jwt_decode(localStorage.getItem('Authorization')).sub;
          UserService.getUserByUsername(username).then(res => {
              this.setState({user: res.data})
          });
    }
    VehicleService.getAvailable().then(res => {
      this.setState({vehicles: res.data})
    })
  }

  handleRent(vehicleId){
    let rental = {user:{id: this.state.user.id}, vehicle:{id: vehicleId}}
    RentalService.newRental(rental).then(res =>{
      window.location.reload(true);
    })
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
        <Table striped bordered hover className="mt-60">
                    <thead>
                        <tr>
                        <th>Image</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>Type</th>
                        <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carsToDisplay.map((item) => (
                        <tr key={item.id}>
                            <td style={{width: "25%"}}>
                                <Image src={process.env.PUBLIC_URL + "/car-default.png"} fluid />
                            </td>
                            <td>{item.model}</td>
                            <td>{item.manufacturer}</td>
                            <td>{item.type}</td>
                            <td>{item.price}</td>
                            <td hidden={localStorage.getItem('Authorization') == null}>
                              <Button onClick={() => this.handleRent(item.id)}>
                                Rent
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
        </Container>
      </React.Fragment>
    );
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
}

export default Home;
