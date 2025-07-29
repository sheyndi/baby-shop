import axios from "axios"


let baseUrl = "https://baby-store-node-backend.onrender.com/api/user";

export const addUserApi = (user) => {
    return axios.post(baseUrl, user);
}

export const loginApi = (user) => {
    return axios.post(baseUrl + '/login', user);
}




