import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import LoginReducer from './reducer_login';
import ProfileReducer from './reducer_profile';
import DashboardReducer from './reducer_dashboard';
import PostProjectReducer from './reducer_post';
import ProjectsReducer from './reducer_projects';
import SingleProjectReducer from './reducer_single_project';
import MyProjectReducer from './reducer_my_projects'
import ViewProfile from './reducer_view_profile';
import Transactions from './reducer_transactions'
import {LOGOUT} from "../actions";

const appReducer = combineReducers({
    /* your app’s top-level reducers */
    login : LoginReducer,
    dashboard : DashboardReducer,
    profile : ProfileReducer,
    postProject : PostProjectReducer,
    allProjects : ProjectsReducer,
    singleProject : SingleProjectReducer,
    myProjects : MyProjectReducer,
    viewProfile : ViewProfile,
    transactions : Transactions,
    form : formReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'mama') {
        console.log(action)
        console.log("order is imp");
        state = undefined;
        console.log(state);
    }
    return appReducer(state, action)
}

export default rootReducer;
