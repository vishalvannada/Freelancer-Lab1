import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class JobsBelowNavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light custom-below">
                    <div className="container">

                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item">
                                    <Link
                                        className={this.props.type === "mySkills" ? 'nav-link border-down' : 'nav-link'}
                                        to="/jobs/myskills">Projects with My Skills</Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={this.props.type === "allProjects" ? 'nav-link border-down' : 'nav-link'}
                                        to="/jobs">Browse Projects</Link>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={this.props.type === "dashboard" ? 'nav-link border-down' : 'nav-link'}
                                        href="">Browse Contests</a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={this.props.type === "inbox" ? 'nav-link border-down' : 'nav-link'}
                                        href="">Browser Local Jobs</a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={this.props.type === "feedback" ? 'nav-link border-down' : 'nav-link'}
                                        href="">Browse Categories</a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={this.props.type === "onemore" ? 'nav-link border-down' : 'nav-link'}
                                        href="">Bookmarks</a>
                                </li>
                            </ul>
                        </div>

                        <Link to='/post-project'>
                            <button type="button" className="btn text-align-right">Post a Project</button>
                        </Link>

                    </div>
                </nav>
            </div>
        );
    }
}

export default JobsBelowNavBar;