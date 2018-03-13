import axios from 'axios';
import _ from 'lodash';

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
export const IMAGE_POST = 'image_post';
export const UP_SUCCESS = 'up_success'
export const AUTH_POST = 'auth_post'
export const NO_AUTH_POST = 'no_auth_post'
export const AUTH_POST_DONE = 'auth_post_done';
export const LOAD_PROJECTS = 'load_projects';
export const LOAD_SINGLE_PROJECT='load_single'

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

function authenticatePost() {
    return {
        type: AUTH_POST,
        payload: {
            isLoggingIn: false,
            isLoggedIn: true,
            errorMsg: '',
            isCompleted: false,
        }
    }
}

function authenticatePostDone() {
    return {
        type: AUTH_POST_DONE,
        payload: {
            isLoggingIn: false,
            isLoggedIn: true,
            errorMsg: '',
            isCompleted: true,
        }
    }
}

function noAuthenticatePost() {
    return {
        type: NO_AUTH_POST,
        payload: {
            isLoggingIn: false,
            isLoggedIn: false,
            errorMsg: '',
            isCompleted: false,
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

function imagePost(response) {
    return {
        type: IMAGE_POST,
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

function profUpSuccess(response) {
    return {
        type: UP_SUCCESS,
        payload: {
            isLoggingIn: false,
            isLoggedIn: true,
            errorMsg: '',
        },
        response: response
    }
}

function loadProjects(response) {
    return {
        type: LOAD_PROJECTS,
        response: response,
    }
}

function SingleProject(response) {
    return{
        type : LOAD_SINGLE_PROJECT,
        response : response,
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


export function editProfile() {

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
    return (dispatch) => {
        const request = axios.post('http://localhost:3000/upload', payload, {
            withCredentials: true,
        }, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': payload.get('mypic').type,
            }
        }).then(response => {
            dispatch(imagePost(response));
        }).catch(error => {
            console.log(error)
            dispatch(noAuthenticate());
        });
    }
}

export function profileSave(values) {
    return (dispatch) => {
        const request = axios.post(`${ROOT_URL}/savedetails`, values, {withCredentials: true}).then(response => {
            dispatch(profUpSuccess(response));
        }).catch(error => {
            dispatch(noAuthenticate())
        });
    }
}

export function postProject(payload) {
    return (dispatch) => {
        const request = axios.post(`${ROOT_URL}/postproject`, payload, {
            withCredentials: true,
        }, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log("vishal")
            dispatch(authenticatePostDone(response));
        }).catch(error => {
            dispatch(noAuthenticatePost());
        });
    }
}

export function postProjectcheck() {
    return (dispatch) => {
        const request = axios.get('http://localhost:3000/login/logincheck', {withCredentials: true}).then(response => {
            dispatch(authenticatePost(response));
        }).catch(error => {
            dispatch(noAuthenticatePost());
        });
    }
}


export function loadAllProjects() {
    return (dispatch) => {
        const request = axios.get('http://localhost:3000/loadprojects', {withCredentials: true}).then(response => {
            console.log(response.data[0])
            dispatch(loadProjects(response));
        }).catch(error => {
            // dispatch(noAuthenticatePost());
        });
    }
}

export function loadSingleProject(id) {
    return (dispatch) => {
        const request = axios.get(`http://localhost:3000/project?id=${id}`,
            {
                withCredentials: true
            },
        ).then(response => {
            console.log(response.data[0])
            dispatch(SingleProject(response));
        }).catch(error => {
            // dispatch(noAuthenticatePost());
        });
    }
}
