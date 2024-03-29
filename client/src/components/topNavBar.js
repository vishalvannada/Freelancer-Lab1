import React, {Component} from 'react';
import PopoverExampleAnimation from "./popOver";
import Notifications from 'material-ui/svg-icons/social/notifications';
import Antenna from 'material-ui/svg-icons/action/settings-input-antenna';
import Menu from 'material-ui/svg-icons/navigation/menu';
import {Link} from 'react-router-dom';

class TopNavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light custom">
                    <div className="container">

                        <Link to="/dashboard">
                            <img className="logo-left brand"
                                 src="https://www.f-cdn.com/assets/webapp/assets/freelancer-logo.svg"
                                 alt="Freelancer Logo"
                                 data-display="block"

                            />
                        </Link>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Hire Freelancers
                                    </a>
                                    {/*<div className="dropdown-menu" aria-labelledby="navbarDropdown">*/}
                                    {/*<a className="dropdown-item">Action</a>*/}
                                    {/*<div className="dropdown-divider"></div>*/}
                                    {/*<a className="dropdown-item">Something else here</a>*/}
                                    {/*</div>*/}
                                </li>
                                <li className="nav-item active dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="">
                                        Work
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <p><strong className="font-size-13 px-4">FIND WORK</strong></p>
                                        <Link className="dropdown-item" to="/jobs/myskills">Projects with My
                                            Skills</Link>
                                        <div className="dropdown-divider"></div>
                                        <Link className="dropdown-item" to='/jobs'>Browse Projects</Link>
                                    </div>
                                </li>
                                <li className="nav-item  active dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        My Projects
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/myprojects">My Projects</Link>
                                        {/*<a className="dropdown-item" href="#">Another action</a>*/}
                                        {/*<div className="dropdown-divider"></div>*/}
                                        {/*<a className="dropdown-item" href="#">Something else here</a>*/}
                                    </div>
                                </li>

                                <li className="nav-item active dropdown">
                                    <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Help
                                    </a>
                                    {/*<div className="dropdown-menu" aria-labelledby="navbarDropdown">*/}
                                    {/*<a className="dropdown-item" href="#">Action</a>*/}
                                    {/*<a className="dropdown-item" href="#">Another action</a>*/}
                                    {/*<div className="dropdown-divider"></div>*/}
                                    {/*<a className="dropdown-item" href="#">Something else here</a>*/}
                                    {/*</div>*/}
                                </li>
                                <li>
                                    <div className="search-top">
                                        <input className="form-control" type="search" placeholder="Search"
                                               aria-label="Search"/>
                                    </div>
                                </li>

                                <li className="nav-item active dropdown">
                                    <Link to="/transactions" className="nav-link dropdown-toggle">
                                        $USD
                                    </Link>

                                </li>


                                <li><img className="icons ml-1" src="/svg/si-glyph-bubble-message-dot-2.svg"/></li>
                                <li className="ml-3"><Notifications/></li>
                                <li className="ml-3"><Antenna/></li>
                                <li className="ml-3"><Menu/></li>
                                <li className="text-center ml-3"><PopoverExampleAnimation
                                    history={this.props.history} name={this.props.name}/></li>

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
