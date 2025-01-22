// api.js
import axios from "axios";
import { baseUrl } from "./config";

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const userRoleResources = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}user/role-resources/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user role resources:", error);
    throw error;
  }
};

export const getCourses = async () => {
  try {
    const response = await axios.get(`${baseUrl}courses`);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getCourseDetails = async (courseId) => {
  try {
    const response = await axios.get(`${baseUrl}course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course details:', error);
    throw error;
  }
};

// Function to get saved cards
export const getSavedCards = async () => {
  try {
    const response = await axios.get(`${baseUrl}saved-cards`);
    return response.data;
  } catch (error) {
    console.error('Error fetching saved cards:', error);
    throw error;
  }
};

export const addNewCard = async (cardData) => {
  try {
    const response = await axios.post(`${baseUrl}saved-cards`, cardData);
    return response.data;
  } catch (error) {
    console.error('Error adding new card:', error);
    throw error;
  }
};

