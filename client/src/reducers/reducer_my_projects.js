import _ from 'lodash';
import {GET_MY_PROJECTS, NO_FROM_PROJECTS, LOGOUT} from '../actions/index'

const initialState = {
    bidProjects: {},
    published: {},
    isLoggingIn: true,
    isLoggedIn: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MY_PROJECTS :
            return {
                bidProjects: _.mapKeys(action.response.data.bidProjects, 'bidid'),
                published: _.mapKeys(action.response.data.publishedProjects, '_id'),
                isLoggingIn: false,
                isLoggedIn: true,
            }
        case NO_FROM_PROJECTS:
            return {
                bidProjects: {},
                published: {},
                isLoggingIn: false,
                isLoggedIn: false,
            }
        // case LOGOUT:
        //     return {
        //         bidProjects: {},
        //         published: {},
        //         isLoggingIn: false,
        //         isLoggedIn: false,
        //     }
        default:
            // console.log("my_projects",state)
            return state;
    }
}
