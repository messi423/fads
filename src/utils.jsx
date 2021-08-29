import axios from 'axios';

const localhost = "http://127.0.0.1:5000";
const api = "/api/v1";
export const endpoint = `${localhost}${api}`;

export const userList = `${endpoint}/users`;
export const userDetail = (id) => `${endpoint}/users/${id}`;

export const adList = `${endpoint}/ads`;
export const adId = (id) => `${endpoint}/ads/${id}`;

export const comment = `${endpoint}/comments`;
//export const productDetail = (id) => `${endpoint}/article/${id}/`;
const user = JSON.parse(localStorage.getItem("user"));

export const authAxios = axios.create({
    baseURL: endpoint,
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
