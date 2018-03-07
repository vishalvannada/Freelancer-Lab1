import React, {Component} from 'react';
import TopNavBar from "./topNavBar";
import ProfileBelowNavBar from './profileBelowNavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BodyProfile from './bodyProfile';



class Profile extends Component{
    render(){
        // this.props.history.push("/");
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

export default Profile;