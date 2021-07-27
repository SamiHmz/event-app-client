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

export const setIntervenantIsOpened = async (id, isOpened) => {
  return await axios.put(`${apiUrl}intervenant/opened/${id}`, {
    is_opened: isOpened,
  });
};

export const getIntervenantIsOpened = async (id) => {
  return await axios.get(`${apiUrl}intervenant/opened/${id}`);
};

export const getAllIntervenantValidations = async (id) => {
  return await axios.get(`${apiUrl}intervenants/validations/${id}`);
};

export const createIntervenantValidation = async (validation) => {
  return await axios.post(`${apiUrl}intervenants/validation`, validation);
};

export const updateIntervenantValidation = async (validation, valiDationId) => {
  return await axios.put(
    `${apiUrl}intervenants/validation/${valiDationId}`,
    validation
  );
};

export const getOneIntervenantValidation = async (id) => {
  return await axios.get(`${apiUrl}intervenants/validation/${id}`);
};

export const deleteIntervenantValidation = async (validationId) => {
  return await axios.delete(`${apiUrl}intervenants/validation/${validationId}`);
};
