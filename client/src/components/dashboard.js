import React, {Component} from 'react';
import TopNavBar from "./topNavBar";
import BelowTopNavBar from "./belowTopNavBar";
import BodyDashboard from "./bodyDashboard";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from "react-redux";
import {check} from "../actions";


class Dashboard extends Component {

    componentDidMount() {
        console.log("here");
        this.props.check();
    }

    render() {

        if (this.props.dashboard.loginStatus.isLoggingIn === true) {
            return <div>
                <MuiThemeProvider>
                    <CircularProgress/>
                </MuiThemeProvider>
            </div>
        }

        if(this.props.dashboard.redirect === true){
            this.props.history.push("/profile")
        }

        if (this.props.dashboard.loginStatus.isLoggedIn === false) {
            this.props.history.push("/login")
        }




        return (
            <div key="vishalv">
                <MuiThemeProvider>
                    <TopNavBar name={this.props.dashboard.username} history={this.props.history}/>
                </MuiThemeProvider>
                <BelowTopNavBar type="dashboard"/>
                <BodyDashboard name={this.props.dashboard.username}/>
            </div>
        )


    }
}

function mapStateToProps(state) {
    return {dashboard: state.dashboard}
}

export default connect(mapStateToProps, {check})(Dashboard);
