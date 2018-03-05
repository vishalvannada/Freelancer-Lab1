import {LOGGING_IN,LOGIN_FAIL,LOGIN_SUCCESS} from "../actions";

//state may be object or array or anything that we want

const initialState = {
    isLoggedIn : false,
    username : null,
    password : null,
    isLoggingIn : false,
    errorMsg : ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGGING_IN:
            return action.payload;
        case LOGIN_SUCCESS:
            return action.payload;
        case LOGIN_FAIL:
            return action.payload;
        default:
            return state;

    }
}