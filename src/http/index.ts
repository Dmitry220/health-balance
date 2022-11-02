import axios from "axios";

export const API_URL = 'http://test.health-balance.ru/api/'

export const $api = axios.create({
  //  withCredentials: true,
    baseURL: API_URL,
	 //withCredentials: true
});

// $api.interceptors.request.use((config)=>{
// 	config.headers = {
// 		Authorization: `Bearer ${localStorage.getItem('auth_token')}`
// 	}
// 	return config
// })