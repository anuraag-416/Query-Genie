// api.ts
import axiosInstance from './mainAxios';

interface Query {
  query_ques: string;
  conversation_id: number;
  db_id: number;
}

const BASE_URL = 'http://localhost:3010/api';

// Create a new query
export const createQuery = async (queryData: Query) => {
  try {
    const response = await axiosInstance.post('/query/createQuery', queryData);
    return response.data; // Returns the response data from the backend
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create query');
  }
};

// Fetch all queries
export const fetchQueries = async (chat_id: number, db_id: number) => {
  try {
    const response = await axiosInstance.get('/query/getAllQueries', {
      params: {
        chat_id,
        db_id,
      },
    });
    return response.data.data; // Returns the list of queries
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch queries');
  }
};

// Fetch answer for a query
export const fetchAnswer = async (query_id: number) => {
  try {
    const response = await axiosInstance.post('/query/fetchAnswer', null, {
      params: { query_id },
    });
    return response.data; // Returns the answer data from the backend
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch answer');
  }
};
