import _ from 'lodash';
import {LOAD_SINGLE_PROJECT, NO_FROM_PROJECTS, LOGOUT} from '../actions/index'

const singleProject = {
    project : {},
    bids : {},
    isBidding : false,
    isLoggingIn : true,
    isLoggedIn : false,
    username : ''
}

export default function (state = singleProject, action) {
    switch (action.type) {
        case LOAD_SINGLE_PROJECT:
            console.log(action.response.data.project[0])
            return {
                project : action.response.data.project,
                bids : _.mapKeys(action.response.data.bids, '_id'),
                isBidding: false,
                isLoggingIn: false,
                isLoggedIn : true,
                username : action.response.data.username,
            };
        case NO_FROM_PROJECTS:
            return{
                project : {},
                bids : {},
                isBidding : false,
                isLoggingIn : false,
                isLoggedIn : false,
                username : ''
            }
        case LOGOUT:
            return{
                project : {},
                bids : {},
                isBidding : false,
                isLoggingIn : false,
                isLoggedIn : false,
                username : ''
            }
        default:
            // console.log("her"+action.type)
            return state;
    }
}