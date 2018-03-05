import axios from 'axios';

export const LOGGING_IN = 'loggingin';
export const LOGIN_SUCCESS = 'loginsuccess';
export const LOGIN_FAIL = 'loginfail'
const ROOT_URL = 'http://localhost:3000';

function loggingIn() {
    return {
        type: LOGGING_IN,
        payload: {
            isLoggedIn: false,
            username: null,
            password: null,
            isLoggingIn: true,
            errorMsg : ''
        }
    }
}

function loginSuccess(response) {
    console.log(response)
    return {
        type: LOGIN_SUCCESS,
        payload: {
            isLoggedIn: true,
            username: null,
            password: null,
            isLoggingIn: true,
            errorMsg : ''
        }
    }
}

function loginError() {
    return {
        type: LOGIN_FAIL,
        payload: {
            isLoggedIn: false,
            username: null,
            password: null,
            isLoggingIn: false,
            errorMsg : 'Please Enter Something',
        }
    }
}

export function loginSubmit(values) {

    return (dispatch) => {
        dispatch(loggingIn());

        const request = axios.post(`${ROOT_URL}/login`, values).then(response => {
            console.log("Came");
            dispatch(loginSuccess(response))
        }).catch(error => {
            console.log("Error: " + error.response.status);
            console.log(request);
            dispatch(loginError())
        });
    }
}
