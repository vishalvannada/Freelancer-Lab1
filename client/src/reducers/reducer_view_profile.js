import {SEND_PROFILE} from "../actions";

const initialState = {
    isLoggingIn : true,
    isLoggedIn : false,
    user : {}
}

export default function (state = initialState, action) {
    switch (action.type){
        case SEND_PROFILE:
            console.log(action.response.data[0])
            return{
                isLoggingIn : false,
                isLoggedIn : true,
                user : action.response.data[0]
            }
        default :
            return state;
    }
}