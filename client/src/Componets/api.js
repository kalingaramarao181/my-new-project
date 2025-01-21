// api.js
import axios from 'axios';
import { baseUrl } from './config';

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