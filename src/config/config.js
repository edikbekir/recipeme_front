import development from './environments/development.json';
const environment = process.env.NODE_ENV,
    config = {development}[environment];

export default config;
