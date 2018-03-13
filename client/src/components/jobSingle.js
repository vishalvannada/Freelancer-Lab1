import React, {Component} from 'react';
import TopNavBar from "./topNavBar";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from "react-redux";
import JobsBelowNavBar from './jobsBelowNavBar';
import JobsBody from './jobsBody'
import {loadSingleProject} from '../actions/index'

class JobSingle extends Component {

    componentDidMount() {
        console.log("Single Job")

        const {id} = this.props.match.params;
        console.log(id)
        this.props.loadSingleProject(id);
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

                <div className="container-post-project">
                    <h4 className="mt-5">{this.props.project.projectname}</h4>
                    <div className="title-single-project">
                        <div className="row">
                            <div className="col-md-1.5 inside-details ml-5 mr-4 my-2 pr-4 font-size-14">
                                <span className="ml-2">Bids</span>
                                <h4 className="text-primary text-center">141</h4>
                            </div>
                            <div className="col-md-1.5 inside-details mr-4 my-2 pr-4 font-size-14">
                                <span>Avg Bid</span>
                                <h4 className="text-primary text-center">141</h4>
                            </div>
                            <div className="col-md-2.5 inside-details mr-4 my-2 pr-4 font-size-14">
                                <span className="ml-2">Project Budget</span>
                                <h4 className="text-primary text-center">141</h4>
                            </div>
                        </div>
                    </div>

                    <div className="title-single-project mt-3">
                        <div className="row">
                            <div className="col-md-6">
                                <h5 className="pt-4 px-4">
                                    Project Description
                                </h5>
                                <p className="px-4">
                                    {this.props.project.projectdesc}
                                </p>
                                <br/>
                                <p><h5 className="px-4">
                                    Skills Required
                                </h5></p>
                                <p className="px-4">
                                    {this.props.project.skills}
                                </p>

                                <p className="font-size-14 px-4" >Project ID : {this.props.project.projectid}</p>
                            </div>
                            <div className="col-md-6">




                                <button className="bid-now-single">
                                    <span>Bid on This Project</span>
                                </button>


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )


    }
}

function mapStateToProps(state) {
    return {project: state.allProjects}
}

export default connect(mapStateToProps, {loadSingleProject})(JobSingle);