import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
// import PostsReducer from './reducer_posts';
import LoginReducer from './reducer_login';
import ProfileReducer from './reducer_profile';
import DashboardReducer from './reducer_dashboard';
import PostProjectReducer from './reducer_post';
import ProjectsReducer from './reducer_projects';
import SingleProjectReducer from './reducer_single_project';
import MyProjectReducer from './reducer_my_projects'

const rootReducer = combineReducers({
    login : LoginReducer,
    dashboard : DashboardReducer,
    profile : ProfileReducer,
    postProject : PostProjectReducer,
    allProjects : ProjectsReducer,
    singleProject : SingleProjectReducer,
    myProjects : MyProjectReducer,
    form : formReducer
});

export default rootReducer;
