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



export const getLocationData = async (country, zip, city, state) => {
  try {
    let response;
    if (country === "IN") {
      response = await axios.get(`https://api.postalpincode.in/pincode/${zip}`);
      console.log("Response from PIN code API (IN):", response.data);
    } else if (country === "US") {
      response = await axios.get(`https://api.zippopotam.us/us/${zip}`);
      console.log("Response from ZIP code API (US):", response.data);
    } else {
      return { error: "Country not supported for postal code validation." };
    }

    const data = response.data;
    if (country === "IN" && data[0].Status === "Error") {
      return { error: "Invalid PIN code for India." };
    } else if (country === "US" && !data.places) {
      return { error: "Invalid ZIP code for the US." };
    } else {
      if (country === "IN") {
        const place = data[0].PostOffice[0];
        if (place) {
          return { city: place.Block, state: place.State, zip: place.Pincode};
        } else {
          console.log("Available Post Offices for the PIN code:", data[0].PostOffice);
          return { error: "Postal code does not match the entered city or state." };
        }
      } else if (country === "US") {
        const place = data.places[0];
        if (place) {
          return { city: place["place name"], state: place["state"] };
        } else {
          console.log("Available places for ZIP code:", place);
          return { error: "Postal code does not match the entered city or state." };
        }
      }
    }
  } catch (error) {
    console.error("Error during postal code validation:", error);
    return { error: "Unable to verify location." };
  }
};
