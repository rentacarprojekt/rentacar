import axios from 'axios';

const URL = "http://localhost:8080/rac/users";

class UserService{

    getUsers(){
        var token = "Bearer " + localStorage.getItem('Authorization');
        var config = {
            headers: {
               Authorization: "Bearer " + localStorage.getItem('Authorization')
            }
         }
        return axios.get(URL, config);
    }

}

export default new UserService();