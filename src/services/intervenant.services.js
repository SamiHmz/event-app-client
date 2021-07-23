import { apiUrl } from "../config";
import axios from "./axios";

export const getAllIntervenant = async (pageNumber) => {
  return axios.get(`${apiUrl}intervenants/${pageNumber}`);
};

export const getAllIntervenantCount = async () => {
  return axios.get(`${apiUrl}intervenant/count`);
};

export const createIntervenant = async (intervenant) => {
  return await axios.post(`${apiUrl}intervenant/`, intervenant);
};

export const deleteIntervenant = async (id) => {
  return await axios.delete(`${apiUrl}intervenant/${id}`);
};

export const getOneIntervenant = async (id) => {
  return await axios.get(`${apiUrl}intervenant/${id}`);
};
export const updateIntervenant = async (intervenant, id) => {
  return await axios.put(`${apiUrl}intervenant/${id}`, intervenant);
};
