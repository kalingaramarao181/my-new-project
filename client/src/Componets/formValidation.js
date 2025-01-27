import axios from "axios";

export const formValidation = async (formData) => {
  let errors = {};

  // Basic validations
  if (!formData.title.trim()) errors.title = "Title is required.";
  if (!formData.firstName.trim()) errors.firstName = "First name is required.";
  if (!formData.lastName.trim()) errors.lastName = "Last name is required.";
  if (!formData.address1.trim()) errors.address1 = "Address is required.";
  if (!formData.city.trim()) errors.city = "City is required.";
  if (!formData.state.trim()) errors.state = "State is required.";
  if (!formData.zip.trim()) errors.zip = "Postal code is required.";
  if (!formData.country.trim()) errors.country = "Country is required.";
  if (!formData.email.trim()) errors.email = "Email is required.";
  if (!formData.password) errors.password = "Password is required.";
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }
  if (!formData.contactNumber.trim()) {
    errors.contactNumber = "Contact number is required.";
  }
  if (!formData.agreeToTerms) {
    errors.agreeToTerms = "You must agree to the terms and conditions.";
  }

  // Postal code validation
  if (!errors.zip) {
    console.log(formData.country);

    try {
      let response;
      const country = formData.country;

      // Validate PIN code for India
      if (country === "IN") {
        response = await axios.get(
          `https://api.postalpincode.in/pincode/${formData.zip}`
        );
      }
      // Validate ZIP code for US
      else if (country === "US") {
        response = await axios.get(
          `https://api.zippopotam.us/us/${formData.zip}`
        );
      } else {
        errors.zip = "Country not supported for postal code validation.";
        return errors;
      }

      const data = response.data;
      console.log(data);

      if (country === "IN" && data[0].Status === "Error") {
        errors.zip = "Invalid PIN code for India.";
      } else if (country === "US" && !data.places) {
        errors.zip = "Invalid ZIP code for the US.";
      } else {
        // Handle Indian postal data
        if (country === "IN") {
          const places = data[0].PostOffice;
          const matchedPlace = places.find(
            (place) =>
              place.Name?.toLowerCase() === formData.city.toLowerCase() &&
              place.Circle?.toLowerCase() === formData.state.toLowerCase()
          );

          if (!matchedPlace) {
            errors.zip = "Postal code does not match the entered city or state.";
          }
        }
        // Handle US postal data
        else if (country === "US") {
          const places = data.places;
          const matchedPlace = places.find(
            (place) =>
              place["place name"]?.toLowerCase() === formData.city.toLowerCase() &&
              place["state"]?.toLowerCase() === formData.state.toLowerCase()
          );

          if (!matchedPlace) {
            errors.zip = "Postal code does not match the entered city or state.";
          }
        }
      }
    } catch (error) {
      errors.zip = "Invalid postal code or unable to verify location.";
    }
  }

  return errors;
};
