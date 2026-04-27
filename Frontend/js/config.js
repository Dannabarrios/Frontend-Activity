const ENVIRONMENTS = {
    dev: {
        API_URL: 'http://localhost:8080/api',
        ENV_NAME: 'Desarrollo'
    },
    qa: {
        API_URL: 'http://localhost:8080/api',
        ENV_NAME: 'QA'
    },
    prod: {
        API_URL: 'http://localhost:8080/api',
        ENV_NAME: 'Producción'
    }
};

// Cambia esto según el ambiente: 'dev', 'qa', 'prod'
const ENV = 'dev';
const API_URL = ENVIRONMENTS[ENV].API_URL;

console.log(`🌿 Ambiente activo: ${ENVIRONMENTS[ENV].ENV_NAME}`);
console.log(`🔗 API URL: ${API_URL}`);