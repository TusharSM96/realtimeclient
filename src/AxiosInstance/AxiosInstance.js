import axios from "axios";
import { BaseUrl } from "../BaseUrl";
const AxiosInstance=axios.create({
    baseURL:BaseUrl,
    timeout:20000,
    headers:{
        "Content-Type": "application/json",
    }
})
AxiosInstance.interceptors.request.use(
    function(config){
        return config
    },
    function(error){
        return Promise.reject(error)
    }
)
AxiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  export default AxiosInstance;