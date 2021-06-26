import { apiUrl } from "../config";
import axios from "./axios";

export const getAllDemandes = async (pageNumber = 1) => {
  return await axios.get(`${apiUrl}/demande/${pageNumber}`);
};

export const getDemandesCount = async (pageNumber = 1) => {
  return await axios.get(`${apiUrl}/demandes/count`);
};
