import React, {Component} from 'react';
import TopNavBar from "./topNavBar";
import ProfileBelowNavBar from './profileBelowNavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



class Profile extends Component{
    render(){
        // this.props.history.push("/");
        return(
            <div>
                <MuiThemeProvider>
                    <TopNavBar/>
                </MuiThemeProvider>
                <ProfileBelowNavBar type="improve"/>

            </div>
        )
    }
}

export default Profile;