import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {

    render() {
        return (

            <div className="total">
                <div className="first_new fixed-top navbar navbar-expand-lg">
                    <div>
                        <img className="logo-left brand extra" src="./freelancer.png" alt="aaa"/>
                        <ul className="second_new navbar-nav">
                            <li className="nav-item auto"><Link to="/login">Log In</Link></li>
                            <li className="nav-item auto"><Link to="/signup">Sign Up</Link></li>
                            <li className="nav-item button">
                                <button><a className="Newa" href="/login">Post a Project</a></button>
                            </li>
                        </ul>
                    </div>

                </div>

                <div>
                    <img className="image1" src="./one.png" alt="aaa"/>
                </div>

                <div>
                    <img className="image1" src="./Capture2.PNG" alt="aaa"/>
                </div>

                <div>
                    <img className="image1" src="./Capture3.png" alt="aaa"/>
                </div>

                <div>
                    <img className="image1" src="./Capture4.png" alt="aaa"/>
                </div>

                <div>
                    <img className="image1" src="./Capture5.png" alt="aaa"/>
                </div>

            </div>
        );
    }
}

export default Home;
