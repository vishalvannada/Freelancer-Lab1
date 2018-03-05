import React, {Component} from 'react';

class BelowTopNavBar extends Component {
    render() {

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light custom-below">
                    <div className="container">

                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item">
                                    <a
                                        className={this.props.type === "myProjects" ? 'nav-link border-down' : 'nav-link'}
                                        href="#">My Projects</a>
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

                        <button type="button" class="btn">Post a Project</button>

                    </div>
                </nav>
            </div>
        );
    }
}

export default BelowTopNavBar;