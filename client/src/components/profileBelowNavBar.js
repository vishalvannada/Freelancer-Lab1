import React, {Component} from 'react';

class ProfileBelowNavBar extends Component {
    render() {

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light custom-below">
                    <div className="container">

                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li>
                                    <a className="nav-link strong-weight">MY PROFILE</a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={this.props.type === "improve" ? 'nav-link border-down' : 'nav-link'}
                                        href="#">Improve Profile</a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={this.props.type === "dashboard" ? 'nav-link border-down' : 'nav-link'}
                                        href="#">My Services</a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={this.props.type === "inbox" ? 'nav-link border-down' : 'nav-link'}
                                        href="#">Get Certified</a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={this.props.type === "feedback" ? 'nav-link border-down' : 'nav-link'}
                                        href="#">Promote Profile</a>
                                </li>
                            </ul>
                        </div>

                        <button type="button" className="btn">Post a Project</button>

                    </div>
                </nav>
            </div>
        );
    }
}

export default ProfileBelowNavBar;