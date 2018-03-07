import axios from 'axios';

export const LOGGING_IN = 'loggingin';
export const LOGIN_SUCCESS = 'loginsuccess';
export const LOGIN_FAIL = 'loginfail';
export const LOGOUT = 'logout';
export const SIGNING_IN = 'signingin';
export const SIGNIN_SUCCESS='signinsuccess';
export const SIGNIN_FAIL = 'signinfail';

const ROOT_URL = 'http://localhost:3000';

function loggingIn() {
    return {
        type: LOGGING_IN,
        payload: {
            isLoggedIn: false,
            username: null,
            password: null,
            isLoggingIn: true,
            errorMsg: ''
        }
    }
}

function loginSuccess(response) {

    const data = response.data[0];
    console.log(data.username);

    localStorage.setItem('username', data.username);
    return {
        type: LOGIN_SUCCESS,
        payload: {
            isLoggedIn: true,
            username: data.username,
            password: data.password,
            isLoggingIn: false,
            errorMsg: ''
        }
    }
}

function loginError(message) {

    // console.log(message.message);
    return {
        type: LOGIN_FAIL,
        payload: {
            isLoggedIn: false,
            username: null,
            password: null,
            isLoggingIn: false,
            errorMsg: message,
        }
    }
}




function signingIn() {
    return {
        type: SIGNING_IN,
        payload: {
            isLoggedIn: false,
            username: null,
            password: null,
            isLoggingIn: true,
            errorMsg: ''
        }
    }
}

function signInSuccess(response) {

    localStorage.setItem('username', response.data.username);
    return {
        type: SIGNIN_SUCCESS,
        payload: {
            isLoggedIn: true,
            username: response.data.username,
            password: '',
            isLoggingIn: false,
            errorMsg: ''
        }
    }
}

function signInError(message) {

    // console.log(message.message);
    return {
        type: SIGNIN_FAIL,
        payload: {
            isLoggedIn: false,
            username: null,
            password: null,
            isLoggingIn: false,
            errorMsg: message,
        }
    }
}



export function loginSubmit(values) {

    return (dispatch) => {
        dispatch(loggingIn());
        const request = axios.post(`${ROOT_URL}/login`, values).then(response => {
            dispatch(loginSuccess(response))
        }).catch(error => {
            const message = JSON.parse(error.request.response);
            dispatch(loginError(message.message))
        });
    }
}


export function logout() {
    return {
        type : LOGOUT,
        payload: {
            isLoggedIn: false,
            username: null,
            password: null,
            isLoggingIn: false,
            errorMsg: '',
        }
    }
}


export function signupSubmit(values) {
    return (dispatch) => {
        dispatch(signingIn());
        const request = axios.post(`${ROOT_URL}/signup`, values).then(response => {
            console.log("1");
            console.log(response.data.username);
            console.log("2");
            dispatch(signInSuccess(response));
        }).catch(error => {
            const message = JSON.parse(error.request.response);
            dispatch(signInError(message.message))
        });
    }
}



export function editProfile(values) {
    return (dispatch) => {
        dispatch(signingIn());
        const request = axios.post(`${ROOT_URL}/signup`, values).then(response => {
            console.log("1");
            console.log(response.data.username);
            console.log("2");
            dispatch(signInSuccess(response));
        }).catch(error => {
            const message = JSON.parse(error.request.response);
            dispatch(signInError(message.message))
        });
    }
}


