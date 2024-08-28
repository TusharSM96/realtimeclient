import axios from "axios";
import { BaseUrl } from "../BaseUrl";
const AxiosInstanceWithToken = axios.create({
  baseURL: BaseUrl,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});
AxiosInstanceWithToken.interceptors.request.use(
  function (config) {
    const Token = JSON.parse(sessionStorage.getItem("UserCrid"));
    config.headers = {
      Authorization: `Bearer ${Token.Token}`,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
AxiosInstanceWithToken.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      // let input = window.confirm("Session is Experire Are You Want To Logout");
      // if (input) {
      //   // window.location.assign('/')
      //   // localStorage.clear(),
      //   // sessionStorage.clear()
      // }
    }
    return Promise.reject(error);
  }
);
export default AxiosInstanceWithToken;
