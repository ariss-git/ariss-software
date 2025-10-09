import axios from "axios";
import apiURL from "./api-url";

export type AddPanelUser = {
  id: string;
  email: string;
  fullname: string;
  profilePic: string;
  role: string;
};

export const createPanelUser = async (payload: AddPanelUser) => {
  return axios.post(`${apiURL}/panel-user/create`, payload);
};

export const fetchAllAdmins = async () => {
  return axios.get(`${apiURL}/panel-user/admin`);
};

export const fetchAllEmployees = async () => {
  return axios.get(`${apiURL}/panel-user/employee`);
};
