import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import _ from 'lodash';
import Computer from 'material-ui/svg-icons/hardware/computer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class JobsBody extends Component {


    renderProjects() {
        return _.map(this.props.projects, project => {
            return (

                <li className="list-group-item" key={project.projectid}>
                    <div className="row font-size-14 p-2">
                        <div className="col-md-7">
                            <div className="text-align-left">
                                <MuiThemeProvider>
                                    <Computer/>
                                </MuiThemeProvider>
                            </div>
                            <div className="ml-5">
                                <Link to={`/jobs/${project.projectid}`}>
                                    <h4 className="text-primary">{project.projectname}</h4>
                                </Link>
                                <p>{project.projectdesc}</p>
                                <span>{project.skills}</span>
                            </div>
                        </div>
                        <div className="col-md-2">
                            4
                        </div>
                        <div className="col-md-3 text-center">
                            <p>{project.budgetrange}</p>
                            <button type="button" className="btn btn-success">Bid Now</button>
                        </div>
                    </div>
                </li>

            )
        })
    }

    componentWillMount() {
        console.log("here")
    }

    render() {
        console.log(this.props.projects)
        return (
            <div className="jobs">
                <ul className="list-group jobs container p-3">

                    <span className="mt-2"></span>
                    <li className="list-group-item background-dark  mt-5">
                        <span className="row font-size-14 p-2">
                            <div className="col-md-7">PROJECT/CONTEST</div>
                            <div className="col-md-2">BIDS/ENTRIES</div>
                            <div className="col-md-3 text-center">PRICE(USD)</div>
                            {/*<div>{this.props.projects}</div>*/}
                        </span>
                    </li>

                    {this.renderProjects()}

                </ul>
            </div>
        )
    }
}

export default connect(null, null)(JobsBody);