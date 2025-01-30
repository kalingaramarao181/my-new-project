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

export const updateUser = async ( userId, updatedData ) => {
  try {
    const response = await axios.put(`${baseUrl}users/${userId}`, updatedData);
    return response.data;
  } catch (error) { 
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const signupUser = async (requestData) => {
  try {
    const response = await axios.post(`${baseUrl}signup`, requestData);
    return response;
  } catch (error) {
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

export const getSavedCards = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}saved-cards/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching saved cards:', error);
    throw error;
  }
};

export const payWithPaytm = async (paymentData) => {
  const response = await axios.post(`${baseUrl}payWithPaytm`, paymentData);
  return response.data;
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

export const getStudents = async () => {
  try {
    const response = await axios.get(`${baseUrl}students`);
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const getEnrolledCourses = async (studentId) => {
  try {
    const response = await axios.get(`${baseUrl}enrolled-courses/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    throw error;
  }
};

export const getParentChildrenEnrolledCourses = async (parentId) => {
  try {
    const response = await axios.get(`${baseUrl}parent-children-enrolled-courses/${parentId}`);    
    return response.data;
  } catch (error) {
    console.error('Error fetching parent children enrolled courses:', error);
    throw error;
  }
};

