import axios from 'axios';

const URL = "http://localhost:8080/rac/enums";

class EnumService{

    getTypes(){
        var token = "Bearer " + localStorage.getItem('Authorization');
        var config = {
            headers: {
               Authorization: token
            }
         }
        return axios.get(URL + "/types/", config);
    }

    getManufacturers(){
        var token = "Bearer " + localStorage.getItem('Authorization');
        var config = {
            headers: {
               Authorization: token
            }
         }
        return axios.get(URL + "/manufacturers/", config);
    }

}

export default new EnumService();