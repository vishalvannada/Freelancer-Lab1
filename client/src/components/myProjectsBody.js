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
            return (
                <div key={project.projectid}>
                    <li className="list-group-item" key={project.projectid}>
                        <div className="row font-size-14 p-2">
                            <div className="col-md-4">
                                <Link to={`/jobs/${project.projectid}`}>
                                    <h4 className="text-primary">{project.projectname}</h4>
                                </Link>
                                <p className="font-size-13">ProjectID : {project.projectid}</p>
                            </div>

                            <div className="col-md-2"><strong className="text-primary">
                                <Link to={`/users/${project.owner}`}>{project.owner}</Link>
                                </strong></div>
                            <div className="col-md-2"><strong>{project.avg}</strong></div>
                            <div className="col-md-2"><strong>{project.amount}</strong></div>
                            <div className="col-md-2 text-success"><strong>OPEN</strong></div>

                        </div>
                    </li>

                </div>
            )
        })
    }

    renderPublishedProjects() {
        return _.map(this.props.myProjects.published, project => {
            return (
                <li className="list-group-item" key={project.projectid}>
                    <div className="row font-size-14 p-2">
                        <div className="col-md-4">
                            <Link to={`/jobs/${project.projectid}`}>
                                <h5 className="text-primary">{project.projectname}</h5>
                            </Link>
                            <span>{project.projectdesc}</span>
                            <br/>

                            <span className="font-size-13">ProjectID : {project.projectid}</span>
                        </div>
                        <div className="col-md-2"><strong></strong></div>
                        <div className="col-md-2"><strong></strong></div>
                        <div className="col-md-2"><strong>{project.avg}</strong></div>
                        <div className="col-md-2 text-success"><strong>OPEN</strong></div>
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