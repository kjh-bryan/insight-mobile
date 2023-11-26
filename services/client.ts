import axios from 'axios';

const expoUrl = '10.0.65.71';
const defaultUrl = 'localhost';

const client = axios.create({ baseURL: `http://${expoUrl}:8080` });

export default client;
