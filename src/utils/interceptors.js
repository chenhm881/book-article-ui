import axios from 'axios';
import { getCookie, } from './methods';

axios.interceptors.request.use(
    config => {
        /*
         Use dev server if in local and dev envs
         Use prod server if in prod env
         */

        let value = getCookie("authorization");
        let existed = value ? value !== "undefined" : false;
        if (!existed) {
            config.url = `http://localhost:8182`
        } else {
            config.headers["authorization"] = value;
            config.headers["Content-type"] = "application/json";
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(res => {
    let { data } = res;
    // console.log(res + data);
    let value = getCookie("authorization");
    let existed = value ? value !== "undefined" : false;
    if (!existed) {
        document.cookie = "authorization=" + res.headers["authorization"];
        document.cookie = "user=" + res.headers["user"];
    }
    return data
}, error => {
    console.log(error.message);
    //let code = error.response.status;
    if (error.response && error.response.status === 403) {
        window.location.href = "https:///Logout?origin=engineermc";
    }
});

