import React, {Component} from 'react';
import TopNavBar from "./topNavBar";
import ProfileBelowNavBar from './profileBelowNavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import BodyProfile from './bodyProfile';
import BodyProfileEdit from './bodyProfileEdit';
import {profileCheck} from "../actions";
import {connect} from "react-redux";


class Profile extends Component {

    componentDidMount() {
        console.log("came profile comp")
        this.props.profileCheck();
    }

    render() {
        console.log("came profile")

        if (this.props.profile.loginStatus.isLoggingIn === true) {
            return <div>
                <MuiThemeProvider>
                    <CircularProgress/>
                </MuiThemeProvider>
            </div>
        }

        if (this.props.profile.loginStatus.isLoggedIn === false) {
            this.props.history.push("/login")
        }

        if (this.props.profile.editing === true) {
            return (
                <div>
                    <MuiThemeProvider>
                        <TopNavBar name={this.props.profile.userDetails.username}/>
                    </MuiThemeProvider>
                    <ProfileBelowNavBar type="improve"/>
                    <MuiThemeProvider>
                        <BodyProfileEdit profile={this.props.profile}/>
                    </MuiThemeProvider>
                </div>
            )

        }
        else {
            return (
                <div>
                    <MuiThemeProvider>
                        <TopNavBar name={this.props.profile.userDetails.username}/>
                    </MuiThemeProvider>
                    <ProfileBelowNavBar type="improve"/>
                    <BodyProfile profile={this.props.profile}/>
                    }
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {profile: state.profile}
}

export default connect(mapStateToProps, {profileCheck})(Profile);