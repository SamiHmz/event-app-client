import { apiUrl } from "../config";
import axios from "./axios";
import { stringifySearchAndFilter } from "../util/usefull_functions";

export const getAllSponsoring = async (pageNumber, search, filter) => {
  const [searchToJson, filterToJson] = stringifySearchAndFilter(search, filter);

  return axios.get(
    `${apiUrl}sponsorings/${pageNumber}/${searchToJson}/${filterToJson}`
  );
};

export const getAllSponsoringCount = async () => {
  return axios.get(`${apiUrl}sponsoring/count`);
};

export const createSponsoring = async (sponsoring) => {
  return await axios.post(`${apiUrl}sponsoring/`, sponsoring);
};

export const deleteSponsoring = async (id) => {
  return await axios.delete(`${apiUrl}sponsoring/${id}`);
};

export const getOneSponsoring = async (id) => {
  return await axios.get(`${apiUrl}sponsoring/${id}`);
};
export const updateSponsoring = async (sponsoring, id) => {
  return await axios.put(`${apiUrl}sponsoring/${id}`, sponsoring);
};

export const setSponsoringIsOpened = async (id, isOpened) => {
  return await axios.put(`${apiUrl}sponsoring/opened/${id}`, {
    is_opened: isOpened,
  });
};

export const getSponsoringIsOpened = async (id) => {
  return await axios.get(`${apiUrl}sponsoring/opened/${id}`);
};

export const getAllSponsoringValidations = async (id) => {
  return await axios.get(`${apiUrl}sponsorings/validations/${id}`);
};

export const createSponsoringValidation = async (validation) => {
  return await axios.post(`${apiUrl}sponsorings/validation`, validation);
};

export const updateSponsoringValidation = async (validation, valiDationId) => {
  return await axios.put(
    `${apiUrl}sponsorings/validation/${valiDationId}`,
    validation
  );
};

export const getOneSponsoringValidation = async (id) => {
  return await axios.get(`${apiUrl}sponsorings/validation/${id}`);
};

export const deleteSponsoringValidation = async (validationId) => {
  return await axios.delete(`${apiUrl}sponsorings/validation/${validationId}`);
};
