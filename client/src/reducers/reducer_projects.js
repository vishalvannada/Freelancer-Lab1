import _ from 'lodash';
import {LOAD_PROJECTS, NO_FROM_PROJECTS} from '../actions/index';
import {LOGOUT} from "../actions";

const projects = {
    isLoggingIn : true,
    isLoggedIn : false,
    projects : {},
    current : '',
    pages : ''
}

export default function (state = projects, action) {
    switch (action.type) {
        case LOAD_PROJECTS:
            return {
                isLoggingIn : false,
                isLoggedIn: true,
                projects : _.mapKeys(action.response.data.projects, '_id'),
                current : action.response.data.current,
                pages : action.response.data.pages
            };
        case NO_FROM_PROJECTS :{
            return {
                isLoggingIn : false,
                isLoggedIn: false,
                projects : {},
                current : '',
                pages : ''
            };
        }
        case LOGOUT:
            return {
                isLoggingIn: false,
                isLoggedIn : false,
                projects : {},
                current : '',
                pages : ''
            }
        default:
            // console.log("her"+action.type)
            // console.log("projects",state)
            return state;
    }
}