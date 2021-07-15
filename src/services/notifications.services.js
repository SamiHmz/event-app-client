import { apiUrl } from "../config";
import axios from "./axios";

export const getAllNotifications = async (pageNumber) => {
  return await axios.get(`${apiUrl}/notifications/${pageNumber}`);
};

export const getUnviewedNotificationsCount = async () => {
  return await axios.get(`${apiUrl}/notification/count`);
};

export const setAllnotificationsToViewed = async () => {
  return await axios.put(`${apiUrl}/notification/viewed`);
};