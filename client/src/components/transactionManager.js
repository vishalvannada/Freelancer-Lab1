import React, {Component} from 'react';
import TopNavBar from "./topNavBar";
import {check} from "../actions";
import {connect} from "react-redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class TransactionManager extends Component {

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <TopNavBar/>
                </MuiThemeProvider>

                <div className="container-single-project text-center mt-5">
                    <div className="card card-right-next transaction">
                        <h5 className="card-header">Featured</h5>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional
                                content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>

                    <div className="card card-right-next transaction">
                        <h5 className="card-header">Featured</h5>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional
                                content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default connect(null, {})(TransactionManager);