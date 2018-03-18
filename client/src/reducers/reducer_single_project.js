import _ from 'lodash';
import {LOAD_SINGLE_PROJECT, NO_FROM_PROJECTS, LOGOUT} from '../actions/index'

const singleProject = {
    project : {},
    bids : {},
    files : {},
    isBidding : false,
    isLoggingIn : true,
    isLoggedIn : false,
}

export default function (state = singleProject, action) {
    switch (action.type) {
        case LOAD_SINGLE_PROJECT:
            console.log(action.response.data.project[0])
            return {
                project : action.response.data.project[0],
                bids : _.mapKeys(action.response.data.bids, 'bidid'),
                files : _.mapKeys(action.response.data.files, 'id'),
                isBidding: false,
                isLoggingIn: false,
                isLoggedIn : true,
            };
        case NO_FROM_PROJECTS:
            return{
                project : {},
                bids : {},
                files : {},
                isBidding : false,
                isLoggingIn : false,
                isLoggedIn : false,
            }
        case LOGOUT:
            return{
                project : {},
                bids : {},
                files : {},
                isBidding : false,
                isLoggingIn : false,
                isLoggedIn : false,
            }
        default:
            // console.log("her"+action.type)
            return state;
    }
}