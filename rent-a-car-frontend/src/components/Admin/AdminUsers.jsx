import { Component } from "react";
import UserService from "../../axios/UserService";
import jwt_decode from "jwt-decode";
import { Container, InputGroup, Table, FormControl } from "react-bootstrap";

class AdminUsers extends Component{

    constructor(props){        
        super(props);
        this.state = {
            user: {},
            users: []
        }
        this.handleChange = this.handleChange.bind(this);
    }    

    componentDidMount() {
        var username = jwt_decode(localStorage.getItem('Authorization')).sub;
        UserService.getUserByUsername(username).then(res => {
            this.setState({user: res.data})
        });
        UserService.getUsers().then(res => {
            this.setState({users: res.data})
        });
    }

    handleChange(username) {
        var tempUser
        UserService.getUserByUsername(username).then(res => {
            tempUser = res.data
            if(tempUser.role == "ROLE_ADMIN")
                tempUser.role = "ROLE_USER";
            else
                tempUser.role = "ROLE_ADMIN";
            UserService.updateUser(tempUser).then(res =>{
                console.log("here")
                UserService.getUsers().then(res => {
                    this.setState({users: res.data})
                });
            });
        });
    }

    render() {
        return(
            <Container>
                <Table striped bordered hover className="mt-60">
                    <thead>
                        <tr>
                        <th>Username</th>
                        <th>Full name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone number</th>
                        <th>Bio</th>
                        <th>Admin</th>
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
                                <InputGroup.Checkbox checked = {item.role == "ROLE_ADMIN"} onChange={() => this.handleChange(item.username)} disabled={this.state.user.username == item.username ? true : false} />
                            </InputGroup>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default AdminUsers