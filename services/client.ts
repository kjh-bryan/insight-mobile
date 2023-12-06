import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const expoUrl = '10.0.66.185';
const mobileHotspotUrl = '192.168.43.119';
const defaultUrl = 'localhost';
const homeUrl = '192.168.68.67';
const outsideUrl = '192.168.1.80';
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
