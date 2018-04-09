import _ from 'lodash';
import {TRANS_SEND} from "../actions/index";

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
        default:
            return state;
    }
}
