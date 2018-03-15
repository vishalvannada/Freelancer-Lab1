import _ from 'lodash';
import {GET_MY_PROJECTS} from '../actions/index'

const myProjects = {
    bidProjects: {},
    published: {},
}

export default function (state = myProjects, action) {
    switch (action.type) {
        case GET_MY_PROJECTS :
            return {
                bidProjects: _.mapKeys(action.response.data.bidProjects, 'bidid'),
                published : _.mapKeys(action.response.data.publishedProjects, 'projectid'),
            }
        default:
            return state;
    }
}