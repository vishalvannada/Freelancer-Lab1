import React, {Component} from 'react';

class BelowTopNavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light custom-below">
                    <div className="container">

                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">My Projects</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Dashboard</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link disabled" href="#">Inbox</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link disabled" href="#">Feedback</a>
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