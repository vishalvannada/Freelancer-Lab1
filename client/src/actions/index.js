import axios from 'axios';

export const LOGGING_IN = 'loggingin';
export const LOGIN_SUCCESS = 'loginsuccess';
export const LOGIN_FAIL = 'loginfail';
export const LOGOUT = 'logout';
export const SIGNING_IN = 'signingin';
export const SIGNIN_SUCCESS = 'signinsuccess';
export const SIGNIN_FAIL = 'signinfail';
export const PROFILE_EDIT = 'profile_edit';
export const NO_AUTH = 'no_auth';
export const AUTH = 'auth';
export const PROFILE_AUTH = 'profile_auth';

const ROOT_URL = 'http://localhost:3000';

function loggingIn() {
    return {
        type: LOGGING_IN,
        payload: {
            isLoggingIn: true,
            isLoggedIn: false,
            errorMsg: ''
        }
    }
}

function loginSuccess(response) {
    const data = response.data[0];
    return {
        type: LOGIN_SUCCESS,
        payload: {
            isLoggingIn: false,
            isLoggedIn: true,
            errorMsg: ''
        }
    }
}

function loginError(message) {

    // console.log(message.message);
    return {
        type: LOGIN_FAIL,
        payload: {
            isLoggingIn: false,
            isLoggedIn: false,
            errorMsg: message,
        }
    }
}

function signingIn() {
    return {
        type: SIGNING_IN,
        payload: {
            isLoggingIn: true,
            isLoggedIn: false,
            errorMsg: ''
        }
    }
}

function signInSuccess() {

    return {
        type: SIGNIN_SUCCESS,
        payload: {
            isLoggingIn: false,
            isLoggedIn: true,
            errorMsg: ''
        }
    }
}

function signInError(message) {

    return {
        type: SIGNIN_FAIL,
        payload: {
            isLoggingIn: false,
            isLoggedIn: false,
            errorMsg: message,
        }
    }
}

function logoutDone() {
    console.log("hee");
    return {
        type: LOGOUT,
        payload: {
            isLoggingIn: false,
            isLoggedIn: false,
            errorMsg: '',
        }
    }
}

function authenticate(response) {
    return {
        type: AUTH,
        payload: {
            isLoggingIn: false,
            isLoggedIn: true,
            errorMsg: '',
        },
        response: response,
    }
}

function noAuthenticate() {
    return {
        type: NO_AUTH,
        payload: {
            isLoggingIn: false,
            isLoggedIn: false,
            errorMsg: '',
        }
    }
}


function profileUpdate(response) {
    console.log("Here")
    return {
        type: PROFILE_EDIT,
        payload: {
            isLoggingIn: false,
            isLoggedIn: true,
            errorMsg: '',
        },
        response: response
    }
}


function profileAuth(response) {
    console.log("Here")
    return {
        type: PROFILE_AUTH,
        payload: {
            isLoggingIn: false,
            isLoggedIn: true,
            errorMsg: '',
        },
        response: response
    }
}


export function loginSubmit(values) {
    return (dispatch) => {
        dispatch(loggingIn());
        const request = axios.post(`${ROOT_URL}/login`, values, {withCredentials: true}).then(response => {
            dispatch(loginSuccess(response))
        }).catch(error => {
            const message = JSON.parse(error.request.response);
            dispatch(loginError(message.message))
        });
    }
}


export function logout() {
    return (dispatch) => {
        const request = axios.get(`${ROOT_URL}/login/logout`, {withCredentials: true}).then(response => {
            dispatch(logoutDone());
        })
    }
}


export function signupSubmit(values) {
    return (dispatch) => {
        dispatch(signingIn());
        const request = axios.post(`${ROOT_URL}/signup`, values, {withCredentials: true}).then(response => {
            dispatch(signInSuccess());
        }).catch(error => {
            const message = JSON.parse(error.request.response);
            dispatch(signInError(message.message))
        });
    }
}


export function check() {
    return (dispatch) => {
        dispatch(signingIn());
        const request = axios.get('http://localhost:3000/login/logincheck', {withCredentials: true}).then(response => {
            dispatch(authenticate(response));
        }).catch(error => {
            dispatch(noAuthenticate());
        });
    }
}


export function profileCheck() {

    console.log("here")
    return (dispatch) => {
        const request = axios.get(`${ROOT_URL}`, {withCredentials: true}).then(response => {
            dispatch(profileAuth(response));
        }).catch(error => {
            dispatch(noAuthenticate());
        });
    }
}


export function editProfile(values) {

    return (dispatch) => {
        dispatch(signingIn());
        const request = axios.get(`${ROOT_URL}`, {withCredentials: true},).then(response => {
            dispatch(profileUpdate(response));
        }).catch(error => {
            dispatch(noAuthenticate());
        });
    }
}


export function uploadImage(payload) {
    console.log("hereinimage")
    console.log(payload.get('dp').type)
    return (dispatch) => {
        const request = axios.post('http://localhost:3000/upload', payload, {
            withCredentials: true,
        }, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': payload.get('dp').type,
                // 'Content-Type': `multipart/form-data; boundary=${payload._boundary}`,
            }
        }).then(response => {
            console.log("vishslkjhoudbshb")
            dispatch(profileUpdate(response));
        }).catch(error => {
            console.log("sdghsf")
            dispatch(noAuthenticate());
        });
    }
} 
