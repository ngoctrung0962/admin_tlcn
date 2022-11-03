import axios from 'axios';
import Storagekey from '../constants/storagekey';

export const callApi = (endpoint, method = 'GET') => {
    return axios({
        method: method,
        url: `http://localhost:8080/api/technological_appliances/${endpoint}`,
        headers: {
            "Content-type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem(Storagekey.ACCESS_TOKEN) || ""}`
        },
    })
        .catch(error => console.log(error))
}

export const apiContainData = (endpoint, method = 'PUT', data) => {
    // const headers = {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept ',
    //     "Access-Control-Allow-Credentials": "PUT"
    // }
    return axios({
        method: method,
        url: `http://localhost:8080/api/technological_appliances/${endpoint}`,
        data: data,
        //header: headers
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem(Storagekey.ACCESS_TOKEN) || ""}`
        }
    })
        .catch(error => console.log(error))
}