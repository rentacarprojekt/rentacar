import axios from 'axios';

const URL = "http://localhost:8080/rac/vehicles";

class VehicleService{

    getAll(){
        var token = "Bearer " + localStorage.getItem('Authorization');
        var config = {
            headers: {
               Authorization: token
            }
        }
        return axios.get(URL, config);
    }

    getAvailable(){
        var token = "Bearer " + localStorage.getItem('Authorization');
        var config = {
            headers: {
               Authorization: token
            }
        }
        return axios.get(URL + '/available', config);
    }

    newVehicle(vehicle){
        var token = "Bearer " + localStorage.getItem('Authorization');
        var config = {
            headers: {
               Authorization: token
            }
        }
        return axios.post(URL, vehicle, config)
    }

    deleteVehicle(id){
        var token = "Bearer " + localStorage.getItem('Authorization');
        var config = {
            headers: {
               Authorization: token
            }
        }
        return axios.delete(URL + '/' + id, config)
    }

}

export default new VehicleService();