import axios from "axios";

const API_URL = "/api/auth";

export const userLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const userRegister = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
    });

    console.log(response.data);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    alert(error.response.data.message);
  }
};
