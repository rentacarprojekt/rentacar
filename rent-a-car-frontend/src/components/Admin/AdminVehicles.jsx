import { Component } from "react";
import UserService from "../../axios/UserService";
import VehicleService from "../../axios/VehicleService";
import jwt_decode from "jwt-decode";
import { InputGroup, Table, Image, Container, Button, Form, Modal } from "react-bootstrap";
import Pagination from "../common/Pagination";
import EnumService from "../../axios/EnumService";

class AdminVehicles extends Component{

    constructor(props){        
        super(props);
        this.state = {
            user: {},
            vehicles: [],
            pageSize: 4,
            currentPage: 1,
            showModal: false,
            newVehicle: {},
            types: [],
            manufacturers: []
        }
        this.saveChanges = this.saveChanges.bind(this);
    }

    componentDidMount() {
        var username = jwt_decode(localStorage.getItem('Authorization')).sub;
        UserService.getUserByUsername(username).then(res => {
            this.setState({user: res.data})
        });
        VehicleService.getAll().then(res => {
            this.setState({vehicles: res.data})
        })
        EnumService.getTypes().then(res => {
            this.setState({types: res.data})
        })
        EnumService.getManufacturers().then(res => {
            this.setState({manufacturers: res.data})
        })
    }
    
    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    showModal(){
        this.setState({showModal: true});
    }

    hideModal(){
        this.setState({showModal: false});
    }

    print(){
        this.state.manufacturers.map((item)=>(
            console.log(item)
        )
        )
        console.log(this.state.manufacturers)
    }

    saveChanges = (event ) =>{
        event.preventDefault()
        const form = event.currentTarget;
        let newVehice = {model: form.model.value, manufacturer: form.manufacturer.value, type: form.type.value, mileage: form.mileage.value, productionYear: form.productionYear.value, price: form.price.value}
        console.log(newVehice)
        VehicleService.newVehicle(newVehice).then(res =>{
            window.location.reload(true);
        })
        this.hideModal()
        
    }

    deleteVehicle(id){
        VehicleService.deleteVehicle(id).then(res =>{
            window.location.reload(true);
        })
    }

    render() {
        const { vehicles, currentPage, pageSize } = this.state;
        const carsToDisplay = [...vehicles].splice(
          (currentPage - 1) * pageSize,
          pageSize
        );
        return(
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
                            <td>
                                <Button variant="danger" onClick={() => this.deleteVehicle(item.id)} disabled={!item.available}>Delete</Button>
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
                <Button variant="primary" onClick={() => {this.showModal()}}>Add new</Button>

                <Modal show={this.state.showModal}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                    <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        New Vehicle
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.saveChanges}>
                            <Form.Group className="mb-3">
                                <Form.Label>Model</Form.Label>
                                <Form.Control name="model" type="text"/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Manufacturer</Form.Label>
                                <Form.Control name="manufacturer" as="select">{
                                    this.state.manufacturers.map((item)=>(
                                        <option value={item}>{item}</option>
                                    )
                                    )
                                }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Type</Form.Label>                                
                                <Form.Control name="type" as="select">{
                                    this.state.types.map((item)=>(
                                        <option value={item}>{item}</option>
                                    )
                                    )
                                }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Mileage</Form.Label>
                                <Form.Control name="mileage" type="number"/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Production year</Form.Label>
                                <Form.Control name="productionYear" type="number"/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control name="price" type="number"/>
                            </Form.Group>
                            <Button variant="outline-success" type="submit">Save</Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-danger" onClick={() => {this.hideModal()}}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
}

export default AdminVehicles;