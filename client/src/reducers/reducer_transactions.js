import _ from 'lodash';
import {TRANS_SEND, TRANS_DONT_SEND} from "../actions/index";

const projects = {
    isLoggingIn : true,
    isLoggedIn : false,
    transIn : [],
    transOut : [],
    wallet : ''
}

export default function (state = projects, action) {

    // console.log(action, TRANS_SEND)
    switch (action.type) {
        case TRANS_SEND:
            console.log("khjgfdsguyi",action.payload.data.transOut)
            return {
                isLoggingIn : false,
                isLoggedIn: true,
                transIn : action.payload.data.transIn,
                transOut : action.payload.data.transOut,
                wallet : action.payload.data.wallet,
            };
        case TRANS_DONT_SEND:
            return{
                isLoggingIn : false,
                isLoggedIn : false,
                transIn : [],
                transOut : [],
                wallet : ''
            }
        default:
            return state;
    }
}
