import AxiosInstance from "../AxiosInstance/AxiosInstance";
import AxiosInstanceWithToken from "../AxiosInstance/AxiosInstanceWithToken";

export const CreateUserApi = async (Data) => {
  try {
    const Url = "user/createuser";
    const responce = await AxiosInstance.post(Url, Data).then((resp) => resp);
    return responce.data;
  } catch (error) {
    return error.response.data;
  }
};
export const UserLoginApi = async (Data) => {
  try {
    const Url = "user/loginuser";
    const responce = await AxiosInstance.post(Url, Data).then((resp) => resp);
    return responce.data;
  } catch (error) {
    return error.response.data;
  }
};
export const ForgetPasswordApi = async (Data) => {
  try {
    const Url = "user/forgetpassword";
    const responce = await AxiosInstance.post(Url, Data).then((resp) => resp);
    return responce.data;
  } catch (error) {
    return error.response.data;
  }
};
export const UpdateUserDetailsApi = async (Data) => {
  try {
    const Url = "user/UpdateUserDetails";
    const responce = await AxiosInstanceWithToken.post(Url, Data).then(
      (resp) => resp
    );
    return responce.data;
  } catch (error) {
    return error.response.data;
  }
};
export const GetuserDetailsApi = async (Data) => {
  try {
    const Url = "user/getuserDetails";
    const responce = await AxiosInstanceWithToken.post(Url, Data).then(
      (resp) => resp
    );
    return responce.data;
  } catch (error) {
    return error.response.data;
  }
};
export const GetUsersListApi = async (Data) => {
  try {
    const Url = "user/serachpepole";
    const responce = await AxiosInstanceWithToken.post(Url, Data).then(
      (resp) => resp
    );
    return responce.data;
  } catch (error) {
    return error.response.data;
  }
};
export const LogoutUserApi = async (Data) => {
  try {
    const Url = "user/logoutuser";
    const response = await AxiosInstanceWithToken.post(Url, Data).then(
      (resp) => resp
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const GetuserdetailsbyidApi = async (Data) => {
  try {
    const Url = "user/getuserdetailsbyid";
    const responce = await AxiosInstanceWithToken.post(Url, Data).then(
      (resp) => resp
    );
    return responce.data;
  } catch (error) {
    return error.response.data;
  }
};
export const ConvertionDataGetApi = async (Data) => {
  try {
    const Url = "user/convertiondatagetbyid";
    const responce = await AxiosInstanceWithToken.post(Url, Data).then(
      (resp) => resp
    );
    return responce.data;
  } catch (error) {
    return error.response.data;
  }
};
export const ConvertiongetallsenderApi = async (Data) => {
  try {
    const Url = "user/convertiongetallsender";
    const responce = await AxiosInstanceWithToken.post(Url, Data).then(
      (resp) => resp
    );
    return responce.data;
  } catch (error) {
    return error.response.data;
  }
};
