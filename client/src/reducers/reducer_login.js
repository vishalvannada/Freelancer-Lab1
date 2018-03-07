import {LOGGING_IN, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, SIGNING_IN, SIGNIN_SUCCESS ,SIGNIN_FAIL} from "../actions";

//state may be object or array or anything that we want

const Logout = {
    isLoggedIn : false,
    username : null,
    password : null,
    isLoggingIn : false,
    errorMsg : ''
}

const Login = {
    isLoggedIn : true,
    username : localStorage.getItem('username'),
    password : null,
    isLoggingIn : false,
    errorMsg : ''
}

const initialState = localStorage.getItem('username') ? Login : Logout;

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGGING_IN:
            return action.payload;
        case LOGIN_SUCCESS:
            // console.log(action.payload.username);
            // const stateSuccess = action.payload;
            return action.payload;
        case LOGIN_FAIL:
            return action.payload;
        case LOGOUT:
            localStorage.clear();
            return action.payload;
        case SIGNING_IN:
            return action.payload;
        case SIGNIN_SUCCESS:
            return action.payload;
        case SIGNIN_FAIL:
            return action.payload;
        default:
            return state;
    }
}