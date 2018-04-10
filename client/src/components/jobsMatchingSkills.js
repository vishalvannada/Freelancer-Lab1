import React, {Component} from 'react';
import TopNavBar from "./topNavBar";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from "react-redux";
import JobsBelowNavBar from './jobsBelowNavBar';
import JobsBody from './jobsBody'
import {searchMySkillsProjects} from '../actions/index'

class JobsMatchingMySkills extends Component {


    componentDidMount() {
        // console.log("here")
        // var page = 1;
        this.props.searchMySkillsProjects();
    }

    render() {

        // if (this.props.projects.isLoggingIn === true) {
        //     return <div>
        //         <MuiThemeProvider>
        //             <CircularProgress/>
        //         </MuiThemeProvider>
        //     </div>
        // }
        //
        // if (this.props.projects.isLoggedIn === false) {
        //     this.props.history.push("/login")
        // }

        return (
            <div>
                <MuiThemeProvider>
                    <TopNavBar history={this.props.history}/>
                </MuiThemeProvider>
                <JobsBelowNavBar type="mySkills"/>
                {/*<JobsBody projects={this.props.projects} history={this.props.history}/>*/}
                {/*<div>*/}
                {/*<img className="imagefooter" src="./Capture5.png" alt="aaa"/>*/}
                {/*</div>*/}
            </div>
        )


    }
}

function mapStateToProps(state) {
    return {
        projects: state.allProjects,
    }
}

export default connect(null, {searchMySkillsProjects})(JobsMatchingMySkills);