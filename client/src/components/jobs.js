import React, {Component} from 'react';
import TopNavBar from "./topNavBar";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from "react-redux";
import JobsBelowNavBar from './jobsBelowNavBar';
import JobsBody from './jobsBody'
import {loadAllProjects} from '../actions/index'

class Jobs extends Component {

    componentWillMount() {
        // console.log("here")
        this.props.loadAllProjects();

    }

    render() {

        // if(this.props.dashboard.redirect === true){
        //     this.props.history.push("/profile")
        // }

        // if (this.props.dashboard.loginStatus.isLoggingIn === true) {
        //     return <div>
        //         <MuiThemeProvider>
        //             <CircularProgress/>
        //         </MuiThemeProvider>
        //     </div>
        // }
        //
        // if (this.props.dashboard.loginStatus.isLoggedIn === false) {
        //     this.props.history.push("/login")
        // }


        return (
            <div>
                <MuiThemeProvider>
                    <TopNavBar/>
                </MuiThemeProvider>
                <JobsBelowNavBar type="improve"/>
                <JobsBody projects={this.props.projects} history = {this.props.history}/>
            </div>
        )


    }
}

function mapStateToProps(state) {
    return {projects: state.allProjects}
}

export default connect(mapStateToProps, {loadAllProjects})(Jobs);