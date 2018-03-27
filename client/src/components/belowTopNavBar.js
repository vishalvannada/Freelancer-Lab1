import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class BelowTopNavBar extends Component {
    render() {

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light custom-below">
                    <div className="container">

                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item">
                                    <Link
                                        to="/myprojects"
                                        className={this.props.type === "myProjects" ? 'nav-link border-down' : 'nav-link'}
                                        >My Projects</Link>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={this.props.type === "dashboard" ? 'nav-link border-down' : 'nav-link'}
                                        href="#">Dashboard</a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={this.props.type === "inbox" ? 'nav-link border-down' : 'nav-link'}
                                        href="#">Inbox</a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={this.props.type === "feedback" ? 'nav-link border-down' : 'nav-link'}
                                        href="#">Feedback</a>
                                </li>
                            </ul>
                        </div>

                        <Link to="post-project"><button type="button" className="btn">Post a Project</button></Link>

                    </div>
                </nav>
            </div>
        );
    }
}

export default BelowTopNavBar;