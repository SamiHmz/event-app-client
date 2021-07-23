import { apiUrl } from "../config";
import axios from "./axios";
const notification = "notification";

export const getAllNotifications = async (pageNumber) => {
  return await axios.get(`${apiUrl}${notification}s/${pageNumber}`);
};

export const getUnviewedNotificationsCount = async () => {
  return await axios.get(`${apiUrl}${notification}/count`);
};

export const setAllnotificationsToViewed = async () => {
  return await axios.put(`${apiUrl}${notification}/viewed`);
};

export const setNotificationToClicked = async (id) => {
  return await axios.put(`${apiUrl}${notification}/clicked/${id}`);
};
