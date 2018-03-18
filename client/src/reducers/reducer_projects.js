import _ from 'lodash';
import {LOAD_PROJECTS, NO_FROM_PROJECTS} from '../actions/index';
import {LOGOUT} from "../actions";

const projects = {
    isLoggingIn : true,
    isLoggedIn : false,
    projects : {}
}

export default function (state = projects, action) {
    switch (action.type) {
        case LOAD_PROJECTS:
            return {
                isLoggingIn : false,
                isLoggedIn: true,
                projects : _.mapKeys(action.response.data, 'projectid')
            };
        case NO_FROM_PROJECTS :{
            return {
                isLoggingIn : false,
                isLoggedIn: false,
                projects : {},
            };
        }
        case LOGOUT:
            return {
                isLoggingIn: false,
                isLoggedIn : false,
                projects : {}
            }
        default:
            // console.log("her"+action.type)
            return state;
    }
}