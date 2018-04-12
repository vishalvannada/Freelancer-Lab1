import _ from 'lodash';
// import { LOCATION_CHANGE } from 'react-router-redux'
import {LOAD_SINGLE_PROJECT, NO_FROM_PROJECTS, LOGOUT, UNLOAD} from '../actions/index'

const singleProject = {
    project : {},
    bids : [],
    isBidding : false,
    isLoggingIn : true,
    isLoggedIn : false,
    username : '',
    avgBid : '',

}

export default function (state = singleProject, action) {
    switch (action.type) {
        case LOAD_SINGLE_PROJECT:
            console.log(action.response.data.project[0])
            return {
                project : action.response.data.project,
                // bids : _.mapKeys(action.response.data.bids, '_id'),
                bids : action.response.data.bids,
                isBidding: false,
                isLoggingIn: false,
                isLoggedIn : true,
                username : action.response.data.username,
                avgBid: action.response.data.avgBid
            };
        case NO_FROM_PROJECTS:
            return{
                project : {},
                bids : [],
                isBidding : false,
                isLoggingIn : false,
                isLoggedIn : false,
                username : '',
                avgBid: ''
            }
        case UNLOAD:
            // console.log("herelocationchange", state)
            return{
                project : {},
                bids : [],
                isBidding : false,
                isLoggingIn : true,
                isLoggedIn : false,
                username : '',
                avgBid: ''
            }

        // case LOGOUT:
        //     return{
        //         project : {},
        //         bids : {},
        //         isBidding : false,
        //         isLoggingIn : false,
        //         isLoggedIn : false,
        //         username : ''
        //     }
        default:
            // console.log("her"+action.type)
            // console.log("single-project",state)
            return state;
    }
}
