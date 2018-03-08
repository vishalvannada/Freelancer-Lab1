import {AUTH, NO_AUTH} from "../actions";

//state may be object or array or anything that we want

const dashboard = {
    loginStatus: {
        isLoggingIn: false,
        isLoggedIn: false,
        errorMsg: ''
    },
    userDetails : {
        username : '',
        email : '',
        phoneNumber : '',
        aboutMe : '',
        skills : ''
    }
}

export default function (state = dashboard, action) {
    switch (action.type) {
        case AUTH:
            return {
                loginStatus: action.payload
            }
        case NO_AUTH:
            return {
                loginStatus: action.payload
            }
        default:
            return state;
    }
}