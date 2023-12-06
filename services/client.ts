import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const hostedURL = 'insight-sg-backend.azurewebsites.net';

const intialiseClient = async (status: string = 'normal') => {
  try {
    const client = axios.create({ baseURL: `https://${hostedURL}` });
    if (status !== 'barebone') {
      const jwt = await SecureStore.getItemAsync('access_token');
      client.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
    }
    return client;
  } catch (err) {
    console.log('Error at [intialiseClient]');
    return null;
  }
};
export default intialiseClient;

export const client = axios.create({ baseURL: `https://${hostedURL}` });
