import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Login from './components/login';
import SignUp from './components/signup';
import Dashboard from "./components/dashboard";
import Profile from "./components/profile";

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

// const store = createStore(
//     reducers,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

export const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    {/*<Route path="/posts/new" component={PostsNew}/>*/}
                    {/*<Route path="/posts/:id" component={PostsShow} />*/}
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/profile" component={Profile}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
