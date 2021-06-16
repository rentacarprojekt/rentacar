import axios from 'axios';

const URL = "http://localhost:8080/rac/rentals";

class RentalService{

    getRentalsForUsername(username){
        var token = "Bearer " + localStorage.getItem('Authorization');
        var config = {
            headers: {
               Authorization: "Bearer " + localStorage.getItem('Authorization')
            }
         }
        return axios.get(URL + "/user/" + username, config);
    }

}

export default new RentalService();