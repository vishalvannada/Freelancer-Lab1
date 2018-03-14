import _ from 'lodash';
import {LOAD_PROJECTS} from '../actions/index'

const projects = {}

export default function (state = projects, action) {
    switch (action.type) {
        case LOAD_PROJECTS:
            return _.mapKeys(action.response.data, 'projectid');
        default:
            // console.log("her"+action.type)
            return state;
    }
}