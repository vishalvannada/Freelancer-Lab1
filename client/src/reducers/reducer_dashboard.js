import {AUTH, LOGOUT, NO_AUTH, SIGNING_IN} from "../actions";

//state may be object or array or anything that we want

const dashboard = {
    loginStatus: {
        isLoggingIn: true,
        isLoggedIn: false,
        errorMsg: ''
    },
    username: ''
}

export default function (state = dashboard, action) {
    switch (action.type) {
        case SIGNING_IN:
            return {
                loginStatus: action.payload,
                username: ''
            }
        case AUTH:
            return {
                loginStatus: action.payload,
                username: action.response.data.username
            }
        case NO_AUTH:
            return {
                loginStatus: action.payload,
                username: ''
            }
        // case LOGOUT:
        //     return {
        //         loginStatus: action.payload,
        //         username: ''
        //     }
        default:
            // console.log("def" + action.type + action.payload)
            // console.log("dashboard",state)
            return state;
    }
}
