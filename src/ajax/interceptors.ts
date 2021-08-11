import axios from 'axios';
import {getCookie, getParamByName} from "./methods";

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    params: {} // do not remove this, its added to add params later in the config
});

instance.interceptors.request.use((config: any) => {
    let value = getCookie("authorization");
    let existed = value ? value !== "undefined" : false;
    if (existed) {
        config.headers["authorization"] = getCookie("authorization");
        config.headers["Content-type"] = "application/json";

    } else {
        let token =  getParamByName("access_token", window.location.href);
        if (token) {
            config.headers["authorization"] = `bearer ${token}`;
            config.headers["Content-type"] = "application/json";
            document.cookie = `authorization=bearer ${token}`;
            document.cookie = "user=" + getParamByName("access_token", window.location.href);



        } else {
            //window.location.href = "http://localhost:8771/oauth/authorize?client_id=blog&client_secret=123&redirect_uri=http://localhost:8062&response_type=token&scope=all&state=abc";
        }
    }
    return config;

}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

instance.interceptors.response.use(res => {
    let { data } = res;
    // console.log(res + data);
    return data
}, error => {
    console.log(error.message);
    //let code = error.response.status;
    if (error.response && error.response.status === 403) {
        console.log(error.response);
        //window.location.href = "http://localhost:8771/oauth/authorize?client_id=blog&client_secret=123&redirect_uri=http://localhost:8062&response_type=token&scope=all&state=abc";
    }
});

export default instance
