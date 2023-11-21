import axios from 'axios';

const expoUrl = '10.0.65.253';
const defaultUrl = 'localhost';

const client = axios.create({ baseURL: `https://${expoUrl}:8080` });

export default client;
