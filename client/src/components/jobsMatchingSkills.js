import React, {Component} from 'react';
import TopNavBar from "./topNavBar";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import JobsBelowNavBar from './jobsBelowNavBar';
import BodyJobsMatchingMySkills from './bodyMatchingMySkills'
import JobsBody from './jobsBody';
import Multiselect from 'react-widgets/lib/Multiselect';
import {searchMySkillsProjects} from '../actions/index'
import {getMyProjects, loadAllProjects, searchProjects} from "../actions";
import {Field, reduxForm} from 'redux-form';
import _ from 'lodash';
import Computer from 'material-ui/svg-icons/hardware/computer';




class JobsMatchingMySkills extends Component {

    componentWillMount() {
        this.props.searchMySkillsProjects();
    }



    render() {

        console.log(this.props.projects)
        if (this.props.projects.isLoggingIn === true) {
            return <div>
                <MuiThemeProvider>
                    <CircularProgress/>
                </MuiThemeProvider>
            </div>
        }
        //
        // if (this.props.projects.isLoggedIn === false) {
        //     this.props.history.push("/login")
        // }

        const {handleSubmit, pristine, reset, submitting} = this.props;
        console.log(this.props.projects.skills)

        return (
            <div>
                <MuiThemeProvider>
                    <TopNavBar history={this.props.history}/>
                </MuiThemeProvider>
                <JobsBelowNavBar type="mySkills"/>
                <BodyJobsMatchingMySkills projects={this.props.projects} history={this.props.history}/>

            </div>
        )


    }
}

function mapStateToProps(state) {
    return {
        projects: state.allProjects,
    }
}

export default connect(mapStateToProps, {searchMySkillsProjects})(JobsMatchingMySkills);