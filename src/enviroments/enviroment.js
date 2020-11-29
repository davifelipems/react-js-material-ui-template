import develop from './dev';
import prod from './prod';

let current_enviroment = {};

if (window.location.host.includes("yourdomain.com")) {
    current_enviroment = prod;
}

if (window.location.host.includes("localhost")) {
    current_enviroment = develop;
}

export default current_enviroment;