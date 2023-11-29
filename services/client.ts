import axios from 'axios';

const expoUrl = '10.0.66.107';
const mobileHotspotUrl = '192.168.43.119';
const defaultUrl = 'localhost';
const homeUrl = '192.168.68.67';

const client = axios.create({ baseURL: `http://${homeUrl}:8080` });

export default client;
