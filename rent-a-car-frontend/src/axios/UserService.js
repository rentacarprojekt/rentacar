import axios from 'axios';

const URL = "http://localhost:8080/rac/users";

class UserService{

    getUsers(){
        var token = "Bearer " + localStorage.getItem('Authorization');
        var config = {
            headers: {
               Authorization: token
            }
        }
        return axios.get(URL, config);
    }

    getUserByUsername(username){
        var token = "Bearer " + localStorage.getItem('Authorization');
        var config = {
            headers: {
               Authorization: token
            }
        }
        return axios.get(URL + "/username/" + username, config);
    }

    updateUser(user){
        var token = "Bearer " + localStorage.getItem('Authorization');
        var config = {
            headers: {
               Authorization: token
            }
        }
        return axios.put(URL, user, config);
    }

    login(user){
        return axios.post(URL+ "/authenticate", user)
    }

    register(user){
        return axios.post(URL, user)
    }

}

export default new UserService();