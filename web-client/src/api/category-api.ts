import axios from "axios";
import apiUrl from "./api-url";

export const fetchAllCategories = async () => {
  return axios.get(`${apiUrl}/stock/category/all`);
};
