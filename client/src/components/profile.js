import React, {Component} from 'react';
import TopNavBar from "./topNavBar";
import ProfileBelowNavBar from './profileBelowNavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BodyProfile from './bodyProfile';
import {check} from "../actions";
import {connect} from "react-redux";



class Profile extends Component{
    render(){
        return(
            <div>
                <MuiThemeProvider>
                    <TopNavBar/>
                </MuiThemeProvider>
                <ProfileBelowNavBar type="improve"/>
                <BodyProfile/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {profile: state.profile}
}

export default connect(mapStateToProps, {check})(Profile);