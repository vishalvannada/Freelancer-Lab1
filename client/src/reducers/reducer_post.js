import {AUTH_POST, NO_AUTH_POST, AUTH_POST_DONE} from "../actions";

const Logout = {
    isLoggingIn : true,
    isLoggedIn : false,
    errorMsg : '',
    isCompleted : false,
}

export default function (state = Logout, action) {
    switch (action.type) {
        case AUTH_POST:
            return action.payload;
        case NO_AUTH_POST:
            return action.payload;
        case AUTH_POST_DONE:
            return action.payload;
        default:
            // console.log("post-project",state)
            return state;
    }
}