import { apiUrl } from "../config";
import axios from "./axios";
import { stringifySearchAndFilter } from "../util/usefull_functions";

export const getAllDemandes = async (pageNumber = 1, search, filter) => {
  const [searchToJson, filterToJson] = stringifySearchAndFilter(search, filter);
  return await axios.get(
    `${apiUrl}/demande/${pageNumber}/${searchToJson}/${filterToJson}`
  );
};
export const getAllNotHappenedEvent = async () => {
  return await axios.get(`${apiUrl}evenements/nothappened`);
};
export const getDemandesCount = async (pageNumber = 1) => {
  return await axios.get(`${apiUrl}/demandes/count`);
};

export const createDemande = async (evenement) => {
  return await axios.post(`${apiUrl}/evenement`, evenement);
};

export const getAllValidation = async (evenmentId) => {
  return await axios.get(`${apiUrl}/validations/${evenmentId}`);
};

export const getOneValidation = async (validationId) => {
  return await axios.get(`${apiUrl}/validation/${validationId}`);
};
export const createDemandeValidation = async (validation) => {
  return await axios.post(`${apiUrl}/validation`, validation);
};

export const deleteDemandeValidation = async (validationId) => {
  return await axios.delete(`${apiUrl}/validation/${validationId}`);
};

export const updateDemandeValidation = async (validation, valiDationId) => {
  return await axios.put(`${apiUrl}/validation/${valiDationId}`, validation);
};

export const setDemandeIsOpened = async (id, isOpened) => {
  return await axios.put(`${apiUrl}/demande/opened/${id}`, {
    is_opened: isOpened,
  });
};

export const getDemandeIsOpened = async (id) => {
  return await axios.get(`${apiUrl}/demande/opened/${id}`);
};

export const getOneDemande = async (id) => {
  return await axios.get(`${apiUrl}/evenement/${id}`);
};

export const updateDemande = async (demande, id) => {
  return await axios.put(`${apiUrl}/evenement/${id}`, demande);
};

export const deleteDemande = async (id) => {
  return await axios.delete(`${apiUrl}/evenement/${id}`);
};
