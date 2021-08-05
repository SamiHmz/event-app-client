import { apiUrl } from "../config";
import axios from "./axios";
import { typeUtilisateur } from "../util/magic_strings";
import { stringifySearchAndFilter } from "../util/usefull_functions";

export const getAllUtilisateur = async (pageNumber, search, filter) => {
  const [searchToJson, filterToJson] = stringifySearchAndFilter(search, filter);
  return axios.get(
    `${apiUrl}users/${pageNumber}/${searchToJson}/${filterToJson}`
  );
};

export const getAllUtilisateurCount = async () => {
  return axios.get(`${apiUrl}users/count`);
};

export const createUtilisateur = async (utilisateur, type) => {
  return await axios.post(
    `${apiUrl}/signup/${typeUtilisateur.INITIATEUR}`,
    utilisateur
  );
};

export const deleteUtilisateur = async (id) => {
  return await axios.delete(
    `${apiUrl}user/${typeUtilisateur.INITIATEUR}/${id}`
  );
};

export const getOneUtilisateur = async (id) => {
  return await axios.get(`${apiUrl}user/${typeUtilisateur.INITIATEUR}/${id}`);
};
export const updateUtilisateur = async (utilisateur, id) => {
  return await axios.put(
    `${apiUrl}user/${typeUtilisateur.INITIATEUR}/${id}`,
    utilisateur
  );
};
export const validateUtilisateur = async (id, decision) => {
  return await axios.put(`${apiUrl}utilisateur/validate/${id}`, decision);
};
