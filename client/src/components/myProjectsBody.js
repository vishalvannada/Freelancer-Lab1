import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import _ from 'lodash'
import {Link} from 'react-router-dom';

const styles = {
    tab: {
        backgroundColor: '#4b4b4b',
    },
};


class MyProjectsBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };


    renderBidProjects() {


        return _.map(this.props.myProjects.bidProjects, project => {
            let proj = project.project[0];
            console.log(proj)
            return (
                <div key={project.project[0]}>
                    <li className="list-group-item" key={proj._id}>
                        <div className="row font-size-14 p-2">
                            <div className="col-md-4">
                                <Link to={`/jobs/single/${proj._id}`}>
                                    <h4 className="text-primary">{proj.projectName}</h4>
                                </Link>
                                <p className="font-size-13">ProjectID : {proj._id}</p>
                            </div>

                            <div className="col-md-2"><strong className="text-primary">
                                <Link to={`/users/${proj.username}`}>{proj.username}</Link>
                                </strong></div>
                            <div className="col-md-2"><strong>AVG</strong></div>
                            <div className="col-md-2"><strong>{project.amount}</strong></div>
                            <div className="col-md-2 text-success"><strong>{proj.status}</strong></div>

                        </div>
                    </li>

                </div>
            )
        })
    }

    renderPublishedProjects() {
        return _.map(this.props.myProjects.published, project => {
            return (
                <li className="list-group-item" key={project._id}>
                    <div className="row font-size-14 p-2">
                        <div className="col-md-4">
                            <Link to={`/jobs/single/${project._id}`}>
                                <h5 className="text-primary">{project.projectName}</h5>
                            </Link>
                            <span>{project.projDesc}</span>
                            <br/>

                            <span className="font-size-13">ProjectID : {project._id}</span>
                        </div>
                        <div className="col-md-2"><strong>{project.freelancer}</strong></div>
                        <div className="col-md-2"><strong></strong></div>
                        <div className="col-md-2"><strong>{project.avg}</strong></div>
                        <div className="col-md-2 text-success"><strong>{project.status}</strong></div>
                    </div>
                </li>
            )
        })
    }

    render() {
        return (
            <div className="container mt-5">
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Tab label="Freelancer" value="a" style={styles.tab}>
                        <div>
                            <ul className="list-group">
                                <li className="list-group-item background-dark mt-2">
                                <span className="row font-size-14">
                                    <div className="col-md-4"><strong>PROJECT</strong></div>
                                    <div className="col-md-2"><strong>EMPLOYER</strong></div>
                                    <div className="col-md-2"><strong>AVG BID</strong></div>
                                    <div className="col-md-2"><strong>YOUR BID</strong></div>
                                    <div className="col-md-2 "><strong>STATUS</strong></div>
                                </span>
                                </li>
                                {this.renderBidProjects()}

                            </ul>

                        </div>
                    </Tab>
                    <Tab label="Employer" value="b" style={styles.tab}>
                        <div>
                            <ul className="list-group">
                                <li className="list-group-item background-dark mt-2">
                                <span className="row font-size-14">
                                    <div className="col-md-4"><strong>PROJECT</strong></div>
                                    <div className="col-md-2"><strong>FREELANCER</strong></div>
                                    <div className="col-md-2"><strong>DEADLINE</strong></div>
                                    <div className="col-md-2"><strong>AVG BID</strong></div>
                                    <div className="col-md-2 "><strong>STATUS</strong></div>
                                </span>
                                </li>
                                {this.renderPublishedProjects()}

                            </ul>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default MyProjectsBody;