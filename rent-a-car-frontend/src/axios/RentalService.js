import axios from 'axios';

const URL = "http://localhost:8080/rac/rentals";

class RentalService{

    getRentalsForUsername(username){
        var token = "Bearer " + localStorage.getItem('Authorization');
        var config = {
            headers: {
               Authorization: token
            }
         }
        return axios.get(URL + "/user/" + username, config);
    }

    newRental(rental){
        var token = "Bearer " + localStorage.getItem('Authorization');
        var config = {
            headers: {
               Authorization: token
            }
         }
        return axios.post(URL, rental, config);
    }

    returnVehicle(rental){
        var token = "Bearer " + localStorage.getItem('Authorization');
        var config = {
            headers: {
               Authorization: token
            }
         }
        return axios.put(URL, rental, config);
    }

}

export default new RentalService();