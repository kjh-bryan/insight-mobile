import axios from 'axios';

const expoUrl = '10.0.66.107';
const mobileHotspotUrl = '192.168.43.119';
const defaultUrl = 'localhost';

const client = axios.create({ baseURL: `http://${expoUrl}:8080` });

export default client;
