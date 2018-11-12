import axios from 'axios';
import store from '../store'

axios.interceptors.request.use(
config=>{
	store.dispatch('getloading',true)
	return config;
},
error => {
    return Promise.reject(error);
  }
);


axios.interceptors.response.use(
response=>{
	store.dispatch('getloading',false)
	return response;
},
error => {
    store.dispatch('getloading', false);
    return Promise.reject(error);
  }
);


export default axios