import React, {Component} from 'react';
import TopNavBar from "./topNavBar";
import BelowTopNavBar from "./belowTopNavBar";
import BodyDashboard from "./bodyDashboard";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {logout} from "../actions";
import {connect} from "react-redux";



class Dashboard extends Component{
    render(){
        // this.props.history.push("/");

        if(this.props.logout.isLoggedIn === false){
            this.props.history.push("/login");
        }

        return(
            <div>
                <MuiThemeProvider>
                <TopNavBar name={this.props.logout.username}/>
                </MuiThemeProvider>
                <BelowTopNavBar type="dashboard"/>
                <BodyDashboard name={this.props.logout.username}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {logout: state.login}
}

export default connect(mapStateToProps, null)(Dashboard);