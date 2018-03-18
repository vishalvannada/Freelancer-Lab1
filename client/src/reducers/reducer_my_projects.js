import _ from 'lodash';
import {GET_MY_PROJECTS, NO_FROM_PROJECTS, LOGOUT} from '../actions/index'

const myProjects = {
    bidProjects: {},
    published: {},
    isLoggingIn: true,
    isLoggedIn: false,
}

export default function (state = myProjects, action) {
    switch (action.type) {
        case GET_MY_PROJECTS :
            return {
                bidProjects: _.mapKeys(action.response.data.bidProjects, 'bidid'),
                published: _.mapKeys(action.response.data.publishedProjects, 'projectid'),
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
        case LOGOUT:
            return {
                bidProjects: {},
                published: {},
                isLoggingIn: false,
                isLoggedIn: false,
            }
        default:
            return state;
    }
}