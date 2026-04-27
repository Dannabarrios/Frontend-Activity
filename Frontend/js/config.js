const CONFIG = {
    dev:  { API_URL: 'http://localhost:8080/api' },
    qa:   { API_URL: 'http://localhost:8080/api' },
    prod: { API_URL: 'http://localhost:8080/api' }
};

const ENV = 'dev';
const API_URL = CONFIG[ENV].API_URL;