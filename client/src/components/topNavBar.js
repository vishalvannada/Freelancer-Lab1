import React, {Component} from 'react';
import PopoverExampleAnimation from "./popOver";
import Notifications from 'material-ui/svg-icons/social/notifications';
import Antenna from 'material-ui/svg-icons/action/settings-input-antenna';
import Menu from 'material-ui/svg-icons/navigation/menu';

class TopNavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light custom">
                    <div className="container">

                        <img className="logo-left brand"
                             src="https://www.f-cdn.com/assets/webapp/assets/freelancer-logo.svg" alt="Freelancer Logo"
                             data-display="block"/>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Hire Freelancers
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </li>
                                <li className="nav-item active dropdown">

                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Work
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </li>
                                <li className="nav-item  active dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        My Projects
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </li>

                                <li className="nav-item active dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Help
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </li>
                                <li>
                                    <div className="search-top">
                                        <input className="form-control" type="search" placeholder="Search"
                                               aria-label="Search"/>
                                    </div>
                                </li>

                                <li className="nav-item active dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Help
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </li>


                                <li><img className="icons ml-2" src="svg/si-glyph-bubble-message-dot-2.svg"/></li>
                                <li className="ml-3"><Notifications/></li>
                                <li className="ml-3"><Antenna/></li>
                                <li className="ml-3"><Menu/></li>
                                <li className="text-center ml-3"><PopoverExampleAnimation/></li>

                                {/*<svg-icon><src href="sprite.svg#si-glyph-bubble-message-dot-2" /></svg-icon>*/}


                            </ul>

                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default TopNavBar;
