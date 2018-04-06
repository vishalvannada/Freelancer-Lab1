import React, {Component} from 'react';
import {connect} from "react-redux";
import {getUserProfile} from "../actions";
import TopNavBar from "./topNavBar";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ViewProfile extends Component {

    componentWillMount() {
        const {username} = this.props.match.params;
        console.log(username)
        this.props.getUserProfile(username)
    }

    render() {
        // const src = this.props.profile.user.imagename !== null ? 'http://localhost:3000/images/' + this.props.profile.user.imagename : 'https://www.buira.org/assets/images/shared/default-profile.png';

        let src = 'https://www.buira.org/assets/images/shared/default-profile.png';
        if(this.props.profile.user.image) {
            src = 'http://localhost:3000/images/' + this.props.profile.user.image;
        }
        return (
            <div>
                <MuiThemeProvider>
                    <TopNavBar history={this.props.history}/>
                </MuiThemeProvider>

                <div className="background-image">
                </div>
                <div className="container">
                    <div className="profile-body">
                        <div className="card profile-body-left">
                            <div className="row inside">
                                <div className="col-md-4">
                                    <div className="profile-div-propic thumbnail">
                                        <img
                                            // src="https://www.buira.org/assets/images/shared/default-profile.png"
                                            alt="..." className="d-block profile-profilepic"
                                            src={src}
                                        />
                                    </div>
                                </div>


                                <div className="col-md-7">
                                    <div className="mt-4 ml-0 pl-0">
                                        <h3 className="mb-3">{this.props.profile.user.username}</h3>
                                        <p className="mb-3">{this.props.profile.user.email}</p>
                                        <p className="mb-3">{this.props.profile.user.phoneNumber}</p>
                                        <p className="mb-3">{this.props.profile.user.aboutMe}</p>
                                        <p className="mb-3">{this.props.profile.user.skills}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card profile-body-right">
                            <div className="card-header">

                                <br/>
                                <br/>
                                <hr/>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {profile: state.viewProfile}
}

export default connect(mapStateToProps, {getUserProfile})(ViewProfile);