import axios from "axios";
import apiURL from "./api-url";

export const fetchAllAdmins = async () => {
  return axios.get(`${apiURL}/panel-user/admin`);
};

export const fetchAllEmployees = async () => {
  return axios.get(`${apiURL}/panel-user/employee`);
};
