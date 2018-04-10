import React, {Component} from 'react';
import TopNavBar from "./topNavBar";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from "react-redux";
import JobsBelowNavBar from './jobsBelowNavBar';
import JobsBody from './jobsBody'
import {loadAllProjects} from '../actions/index'

class Jobs extends Component {

    // componentWillReceiveProps (nextProps) {
    //     console.log(nextProps)
    //     console.log(this.props.match.params.page)
    //     if(nextProps.match.params.page !== this.props.match.params.page) {
    //         // Clean component and reload?
    //         window.location.reload()
    //     }
    // }

    componentDidMount() {
        // console.log("here")
        var page = 1;
        this.props.loadAllProjects(page);
    }

    render() {

        if (this.props.projects.isLoggingIn === true) {
            return <div>
                <MuiThemeProvider>
                    <CircularProgress/>
                </MuiThemeProvider>
            </div>
        }

        if (this.props.projects.isLoggedIn === false) {
            this.props.history.push("/login")
        }

        return (
            <div>
                <MuiThemeProvider>
                    <TopNavBar history={this.props.history} />
                </MuiThemeProvider>
                <JobsBelowNavBar type="allProjects"/>
                <JobsBody projects={this.props.projects} history={this.props.history}/>
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

export default connect(mapStateToProps, {loadAllProjects})(Jobs);
