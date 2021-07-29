import { apiUrl } from "../config";
import axios from "./axios";

export const getAllBilan = async (pageNumber) => {
  return axios.get(`${apiUrl}bilans/${pageNumber}`);
};

export const getAllBilanCount = async () => {
  return axios.get(`${apiUrl}bilans/count`);
};

export const createBilan = async (bilan) => {
  return await axios.post(`${apiUrl}bilan/`, bilan);
};

export const deleteBilan = async (id) => {
  return await axios.delete(`${apiUrl}bilan/${id}`);
};

export const getOneBilan = async (id) => {
  return await axios.get(`${apiUrl}bilan/${id}`);
};
export const updateBilan = async (bilan, id) => {
  return await axios.put(`${apiUrl}bilan/${id}`, bilan);
};
