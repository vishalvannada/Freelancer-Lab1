import {
    LOGGING_IN,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    SIGNING_IN,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    AUTH,
    NO_AUTH
} from "../actions";

//state may be object or array or anything that we want

const Logout = {
    isLoggingIn: true,
    isLoggedIn: false,
    errorMsg: ''
}

export default function (state = Logout, action) {
    // console.log(state, action.type)
    switch (action.type) {
        case LOGGING_IN:
            return action.payload;
        case LOGIN_SUCCESS:
            return action.payload;
        case LOGIN_FAIL:
            return action.payload;
        // case LOGOUT:
        //     return action.payload;
        case SIGNING_IN:
            return action.payload;
        case SIGNIN_SUCCESS:
            return action.payload;
        case SIGNIN_FAIL:
            return action.payload;
        case AUTH:
            return action.payload;
        case NO_AUTH:
            return action.payload;
        case 'mama':
            console.log("Here")
            return {
                isLoggingIn: true,
                isLoggedIn: false,
                errorMsg: ''
            }
        default:
            return state;
    }
}
