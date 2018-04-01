import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import _ from 'lodash';
import Computer from 'material-ui/svg-icons/hardware/computer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {displayBidSection} from '../actions/index'

class JobsBody extends Component {


    renderProjects() {
        return _.map(this.props.projects.projects, project => {
            return (

                <li className="list-group-item" key={project._id}>
                    <div className="row font-size-14 p-2">
                        <div className="col-md-7">
                            <div className="text-align-left">
                                <MuiThemeProvider>
                                    <Computer/>
                                </MuiThemeProvider>
                            </div>
                            <div className="ml-5">
                                <Link to={`/jobs/single/${project._id}`}>
                                    <h4 className="text-primary">{project.projectName}</h4>
                                </Link>
                                <p>{project.projectdesc}</p>
                                <strong>Skills : </strong><span>{project.skillsReq}</span>
                                <br/>
                                <h6>Employer : <span className="text-primary">
                                    <Link to={`/users/${project.username}`}>
                                    {project.username}
                                    </Link>
                                </span></h6>
                            </div>
                        </div>
                        <div className="col-md-2">
                            {project.bidcount}
                        </div>
                        <div className="col-md-3 text-center">
                            <p>{project.estBudget}</p>
                            <button type="button" className="btn btn-success" onClick={() => this.props.history.push({
                                pathname: `jobs/${project._id}`,
                                state: {toggle: true}
                            })}>Bid Now
                            </button>
                            <br/>
                            <br/>
                            <span className="font-size-13">ProjectID : {project._id}</span>
                        </div>
                    </div>
                </li>

            )
        })
    }


    one() {

        let list = [];

        let i = (Number(this.props.projects.current) > 5 ? Number(this.props.projects.current) - 4 : 1)

        for (; i <= (Number(this.props.projects.current) + 4) && i < this.props.projects.pages; i++) {
            if (i === this.props.projects.current) {
                list.push(<li className="page-item active"><a> {i} </a></li>)
            } else {
                list.push(<li key={i} className="page-item"><Link className="page-link" to={`/jobs/${i}`}> {i} </Link></li>)
            }
            if (i === Number(this.props.projects.current) + 4 && i < this.props.projects.pages) {
                list.push(<li className="page-item disabled"><a className="page-link">...</a></li>)
            }
        }

        console.log(list)

        i = (Number(this.props.projects.current) > 5 ? Number(this.props.projects.current) - 4 : 1)
        return (
            this.props.projects.pages > 0 ?

                <ul className="pagination">

                    {this.props.projects.current === 1 ? <li className="page-item disabled"><a>First</a></li> :
                        <li className="page-item"><Link className="page-link" to="/jobs/1">First</Link></li>}

                    {i != 1 ? <li className="page-item disabled"><a className="page-link">...</a></li> : ''}
                    {list}

                    {this.props.projects.current === this.props.projects.pages ?
                        <li className="disabled page-item"><a className="page-link">Last</a></li> :
                        <li className="page-item"><Link className="page-link" to={`/jobs/${this.props.projects.pages}`}>Last</Link></li>}
                </ul>
                : ''
        );
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
                            <div className="col-md-7">PROJECT</div>
                            <div className="col-md-2">BIDS/ENTRIES</div>
                            <div className="col-md-3 text-center">PRICE(USD)</div>
                            {/*<div>{this.props.projects}</div>*/}
                        </span>
                    </li>

                    {this.renderProjects()}
                    {this.one()}

                </ul>
            </div>
        )
    }
}

export default connect(null, {displayBidSection})(JobsBody);