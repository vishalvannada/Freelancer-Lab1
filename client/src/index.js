import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Login from './components/login';
import SignUp from './components/signup';
import Dashboard from "./components/dashboard";
import Profile from "./components/profile";
import axios from 'axios';
import PostProject from './components/postProject'
import Jobs from './components/jobs'
import JobSingle from './components/jobSingle';
import MyProjects from './components/myProjects';
import NotFound from './components/notFound';
import Home from './components/home';
import ViewProfile from './components/viewProfile';
import JobsMatchingMySkills from './components/jobsMatchingSkills'
import Transaction from "./components/creditCard";
import TransactionManagement from './components/transactionManager';

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

export const store = createStoreWithMiddleware(reducers);

function loggedIn() {
    console.log('looo')
    return (dispatch) => {
        const request = axios.get('http://localhost:3000/login/logincheck', {withCredentials: true}).then(response => {
            return true
        }).catch(error => {
            return false
        });
    }
}

function requireAuth(nextState, replace) {
    console.log("hereddddddd")
    if (!loggedIn()) {
        replace({
            pathname: '/login'
        })
    }
}


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/post-project" component={PostProject}/>
                    <Route path="/myprojects" component={MyProjects}/>
                    <Route path="/transactions" component={TransactionManagement}/>
                    <Route path="/jobs/single/:id" component={JobSingle}/>
                    <Route path="/jobs/myskills" component={JobsMatchingMySkills}/>
                    <Route path="/jobs" component={Jobs}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/users/:username" component={ViewProfile}/>
                    <Route path="/pay" component={Transaction}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
