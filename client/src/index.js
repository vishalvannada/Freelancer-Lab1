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
import axios from 'axios'

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

// const store = createStore(
//     reducers,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

export const store = createStoreWithMiddleware(reducers);

// const request = axios.get('http://localhost:3000').then(response => {
//     this.props.history.push("/dashboard")
// }).catch(error => {
//     const message = JSON.parse(error.request.response);
//     console.log(message);
// });


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/dashboard" onEnter component={Dashboard}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
