// api.ts
import axiosInstance from './mainAxios';

interface DbConfig {
  name: string;
  db_host: string;
  db_username: string;
  db_password: string;
  dialect: string;
  db_context: string;
  config: any;
  status: string;
}

// Add a new database configuration
export const addDbConfig = async (dbConfig: DbConfig) => {
  try {
    const response = await axiosInstance.post('/dbConfig/addDbConfig', dbConfig);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to add database configuration');
  }
};

// Fetch all database configurations for a user
export const getDbConfigs = async (userId: number) => {
  try {
    const response = await axiosInstance.get('/dbConfig/getAllConfigs', {
      params: { user_id: userId },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch database configurations');
  }
};

// Delete a database configuration
export const deleteDbConfig = async (configId: number) => {
  try {
    const response = await axiosInstance.delete(`/database/deleteDbConfig/${configId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete database configuration');
  }
};
