import axios from 'axios';
import _ from 'lodash';
import createHistory from 'history/createBrowserHistory';
import {push} from 'react-router-redux'

const history = createHistory()

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
export const LOAD_SINGLE_PROJECT = 'load_single';
export const DISPLAY_BID = 'display_bid';
export const GET_MY_PROJECTS = 'get_my_projects';
export const NO_FROM_PROJECTS = 'no_from_projects';
export const SEND_PROFILE = 'send_profile'


const ROOT_URL = 'http://localhost:3000';

function loggingIn() {
    return {
        type: LOGGING_IN,
        payload: {
            isLoggingIn: true,
            isLoggedIn: true,
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

function logoutDone(callback) {
    console.log("hee");
    return {
        // type: LOGOUT,
        // payload: {
        //     isLoggingIn: false,
        //     isLoggedIn: false,
        //     errorMsg: '',
        // }

        type: 'mama',
        payload: callback()
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

function noFromProjects() {
    return {
        type: NO_FROM_PROJECTS,
    }
}

function SingleProject(response) {
    return {
        type: LOAD_SINGLE_PROJECT,
        response: response,
    }
}


function myProjectsDispatch(response) {
    return {
        type: GET_MY_PROJECTS,
        response: response,
    }
}

function sendUserData(response) {
    return {
        type: SEND_PROFILE,
        response: response
    }
}

export function loginSubmit(values) {
    return (dispatch) => {
        dispatch(loggingIn());
        const request = axios.post(`${ROOT_URL}/login`, values, {withCredentials: true}).then(response => {
            console.log("Came here dude")
            dispatch(loginSuccess(response))
        }).catch(error => {
            const message = JSON.parse(error.request.response);
            dispatch(loginError(message.message))
        });
    }
}

function displayBid() {
    return {
        type: DISPLAY_BID,
    }
}


export function logout(callback) {
    return (dispatch) => {
        const request = axios.get(`${ROOT_URL}/login/logout`, {withCredentials: true}).then(response => {
            dispatch(logoutDone(callback));
        })
    }
}


export function signupSubmit(values) {
    return (dispatch) => {
        // dispatch(signingIn());
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
            console.log(response)
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
        const request = axios.post(`${ROOT_URL}/upload`, payload, {
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
        const request = axios.post(`${ROOT_URL}/project/postproject`, payload, {
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
        const request = axios.get(`${ROOT_URL}/login/logincheck`, {withCredentials: true}).then(response => {
            dispatch(authenticatePost(response));
        }).catch(error => {
            dispatch(noAuthenticatePost());
        });
    }
}


export function loadAllProjects(page) {
    console.log("here", page)
    return (dispatch) => {
        const request = axios.get(`${ROOT_URL}/project/loadprojects?page=${page}`, {withCredentials: true}).then(response => {
            dispatch(loadProjects(response));
        }).catch(error => {
            dispatch(noFromProjects());
        });
    }
}

export function loadSingleProject(id) {
    return (dispatch) => {
        const request = axios.get(`${ROOT_URL}/project?id=${id}`, {withCredentials: true},
        ).then(response => {
            console.log(response.data)
            dispatch(SingleProject(response));
        }).catch(error => {
            dispatch(noFromProjects());
        });
    }
}

export function hireFreelancer(payload) {

    return (dispatch) => {
        const request = axios.post(`${ROOT_URL}/project/hire`, {
            email : payload
        }, {
            withCredentials: true,
        }, {
            headers: {
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            console.log(response.data)
            // dispatch(SingleProject(response));
        }).catch(error => {
            // dispatch(noFromProjects());
        });
    }
}

export function displayBidSection() {

    // DISPLAY_BID
    console.log("here");
    return (dispatch) => {
        dispatch(displayBid());
        dispatch(push('/dashboard'))
    }
}


export function submitBid(values) {
    return (dispatch) => {
        const request = axios.post(`${ROOT_URL}/savebid`, values, {withCredentials: true},
        ).then(response => {
            console.log(response)
            // dispatch(SingleProject(response));
        }).catch(error => {
            dispatch(noFromProjects());
        });
    }
}

export function getMyProjects() {
    console.log("here")
    return (dispatch) => {
        const request = axios.get(`${ROOT_URL}/project/getmyprojects`, {withCredentials: true},
        ).then(response => {
            console.log("here2");
            dispatch(myProjectsDispatch(response));
        }).catch(error => {
            dispatch(noFromProjects());
        });
    }
}

export function getUserProfile(username) {
    return (dispatch) => {
        const request = axios.get(`${ROOT_URL}/getuserprofile?username=${username}`, {withCredentials: true},
        ).then(response => {
            console.log("here2");
            dispatch(sendUserData(response));
        }).catch(error => {
            // dispatch(noFromUserProfile());
        });
    }
}

export function searchProjects(values) {
    // console.log(values, values.get('page'), values.get('projectName'))

    return (dispatch) => {
        const request = axios.get(`${ROOT_URL}/project/search`, {
                params: {
                    projectName: values.get('projectName'),
                    skillsReq: values.get('skillsReq'),
                    page: values.get('page')
                },
                withCredentials: true
            }
        ).then(response => {
            console.log(response)
            // dispatch(SingleProject(response));
            dispatch(loadProjects(response));
        }).catch(error => {
            // dispatch(noFromProjects());
        });
    }
}