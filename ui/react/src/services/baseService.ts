import axios, {AxiosResponse} from 'axios';
import Swal, {SweetAlertOptions} from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const swal = withReactContent(Swal);


function getConfig(clb: Function, userHeader?: Object) {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        "Content-type": "application/json",
        "resolution": window.screen.width + 'x' + window.screen.height,
        "timezone": "" + new Date().getTimezoneOffset(),
        "cpu-core": "" + navigator.hardwareConcurrency,
        "platform": navigator.platform
    };

    if (userHeader) {
        Object.keys(userHeader).map(cv => {
            headers[cv] = userHeader[cv]
        })
    }

    clb({
        baseURL: "/api/",
        timeout: 10000,
        headers: headers
    });
}

function handleResponse(response: AxiosResponse, callback: Function): void {
    switch (response.status) {
        case 400:
        case 401:
        case 403:
        case 500:
            let setting: SweetAlertOptions = {
                type: 'error',
                title: 'Error Occurred',
                text: response.data ? response.data : "Something went wrong",
            };
            fireSwal(setting);
            break;
        case 200:
            if (response && response.data) {
                //that.setState({ eventFields: response.data })
                callback(response.data);
            }
            break;
        case 204:
            callback();
            break;
        default:
    }
}

function handleError(error: any) {
    console.error(error);
}

export function get(url: string, successCB: Function, data: {} = {}, errorCB: Function = undefined) {
    getConfig((config) => {
        config['params'] = data;
        axios.get(url, config)
            .then(function (response) {
                handleResponse(response, successCB);
            })
            .catch(function (error) {
                console.error("error occurred", error);
                if (errorCB) {
                    errorCB(error);
                } else
                    handleError(error);
            });
    });
}

export function post(url: string, data: any, sucessCB: Function, errorCB: Function, userHeader?: Object) {
    getConfig((config) => {
        axios.post(url, data, config)
            .then(function (response) {
                handleResponse(response, sucessCB);
            })
            .catch(function (error) {
                console.error("error occurred", error);
                if (errorCB) {
                    errorCB(error);
                } else
                    handleError(error);
            });
    }, userHeader);
}

export function put(url: string, data: any, sucessCB: Function, errorCB: Function, userHeader?: Object) {
    getConfig((config) => {
        axios.put(url, data, config)
            .then(function (response) {
                handleResponse(response, sucessCB);
            })
            .catch(function (error) {
                console.error("error occurred", error);
                if (errorCB) {
                    errorCB(error);
                } else
                    handleError(error);
            });
    }, userHeader);
}

export function fireSwal(settings: SweetAlertOptions) {
    swal.fire(settings);
}

