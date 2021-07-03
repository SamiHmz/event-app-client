import { apiUrl } from "../config";
import axios from "./axios";

export const getAllDemandes = async (pageNumber = 1) => {
  return await axios.get(`${apiUrl}/demande/${pageNumber}`);
};

export const getOneDemande = async (id) => {
  return await axios.get(`${apiUrl}/evenement/${id}`);
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
