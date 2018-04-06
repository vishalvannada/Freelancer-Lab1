import React, {Component} from 'react';
import TopNavBar from "./topNavBar";
import MyProjectsBelowNavBar from './myProjectsBelowNavBar';
import MyProjectsBody from './myProjectsBody';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from "react-redux";
import {getMyProjects} from "../actions";


class MyProjects extends Component {

    componentDidMount() {
        this.props.getMyProjects();
    }

    render() {

        if (this.props.myProjects.isLoggingIn === true) {

            console.log("sfjsbhj")
            return <div>
                <MuiThemeProvider>
                    <CircularProgress/>
                </MuiThemeProvider>
            </div>
        }

        if(this.props.myProjects.isLoggedIn === false){
            this.props.history.push("/login")
        }

        // console.log(this.props.myProjects)
        return (
            <div>
                <MuiThemeProvider>
                    <TopNavBar history={this.props.history}/>
                </MuiThemeProvider>
                <MyProjectsBelowNavBar type="myProjects"/>
                <MuiThemeProvider>
                    <MyProjectsBody myProjects={this.props.myProjects}/>
                </MuiThemeProvider>
            </div>
        )


    }
}

function mapStateToProps(state) {
    return {myProjects: state.myProjects}
}

export default connect(mapStateToProps, {getMyProjects})(MyProjects);