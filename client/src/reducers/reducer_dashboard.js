import {AUTH, LOGOUT, NO_AUTH} from "../actions";

//state may be object or array or anything that we want

const dashboard = {
    loginStatus: {
        isLoggingIn: false,
        isLoggedIn: false,
        errorMsg: ''
    },
    username : ''
}

export default function (state = dashboard, action) {
    switch (action.type) {
        case AUTH:
            console.log(action.response.data.username);
            return {
                loginStatus: action.payload,
                username : action.response.data.username
            }
        case NO_AUTH:
            return {
                loginStatus: action.payload,
                username : ''
            }
        case LOGOUT:
            return {
                loginStatus: action.payload,
                username : ''
            }
        default:
            return state;
    }
}