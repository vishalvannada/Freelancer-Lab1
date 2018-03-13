import _ from 'lodash';
import {LOAD_PROJECTS, LOAD_SINGLE_PROJECT} from '../actions/index'

const projects = {}

export default function (state = projects, action) {
    switch (action.type) {
        case LOAD_PROJECTS:
            return _.mapKeys(action.response.data, 'projectid');
        case LOAD_SINGLE_PROJECT:
            const project = action.response.data[0];
            return project;
        default:
            console.log("her"+action.type)
            return state;
    }
}