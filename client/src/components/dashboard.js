import React, {Component} from 'react';
import TopNavBar from "./topNavBar";
import BelowTopNavBar from "./belowTopNavBar";
import BodyDashboard from "./bodyDashboard";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



class Dashboard extends Component{
    render(){
        return(
            <div>
                <MuiThemeProvider>
                <TopNavBar/>
                </MuiThemeProvider>
                <BelowTopNavBar type="dashboard"/>
                <BodyDashboard/>
            </div>
        )
    }
}

export default Dashboard;