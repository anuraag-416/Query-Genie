import axios from 'axios';

const BASE_URL = 'http://localhost:3010';

interface User {
  user_name: string;
  email: string;
  password: string;
}

// Register a new user
export const registerUser = async (userData: User) => {
  try {
    const response = await axios.post(`${BASE_URL}/createUser`, userData);
    return response.data;
  } catch (error:any) {
    throw new Error(error.response?.data?.message || 'Failed to register user');
  }
};


export const loginUser = async (user: User) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email: user.email,
      password: user.password,
    });
    
    const token = response.data.token; 

    if (token) {
      localStorage.setItem('rag_token', token);
    }

    return response.data; 
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to log in');
  }
};