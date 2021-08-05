import { apiUrl } from "../config";
import axios from "./axios";
import { stringifySearchAndFilter } from "../util/usefull_functions";

export const getAllBilan = async (pageNumber, search, filter) => {
  const [searchToJson, filterToJson] = stringifySearchAndFilter(search, filter);

  return axios.get(
    `${apiUrl}bilans/${pageNumber}/${searchToJson}/${filterToJson}`
  );
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
export const validateBilan = async (id, decision) => {
  return await axios.put(`${apiUrl}bilan/validate/${id}`, decision);
};
