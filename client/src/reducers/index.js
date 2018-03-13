import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
// import PostsReducer from './reducer_posts';
import LoginReducer from './reducer_login';
import ProfileReducer from './reducer_profile';
import DashboardReducer from './reducer_dashboard';
import PostProjectReducer from './reducer_post';
import ProjectsReducer from './reducer_projects';

const rootReducer = combineReducers({
    login : LoginReducer,
    dashboard : DashboardReducer,
    profile : ProfileReducer,
    postProject : PostProjectReducer,
    allProjects : ProjectsReducer,
    form : formReducer
});

export default rootReducer;
