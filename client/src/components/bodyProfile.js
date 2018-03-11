import React, {Component} from 'react';
import {check, editProfile} from "../actions";
import {connect} from "react-redux";


class BodyProfile extends Component {

    handleEdit() {
        this.props.editProfile();
    }

    render() {

        const src = this.props.profile.userDetails.image !== '' ? 'http://localhost:3000/images/' + this.props.profile.userDetails.image : 'https://www.buira.org/assets/images/shared/default-profile.png';
        return (
            <div>
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
                                        <h3 className="mb-3">{this.props.profile.userDetails.username}</h3>
                                        <p className="mb-3">{this.props.profile.userDetails.email}</p>
                                        <p className="mb-3">{this.props.profile.userDetails.phoneNumber}</p>
                                        <p className="mb-3">{this.props.profile.userDetails.aboutMe}</p>
                                        <p className="mb-3">{this.props.profile.userDetails.skills}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card profile-body-right">
                            <div className="card-header">
                                <button className="edit-profile-button" onClick={() => this.handleEdit()}
                                        type="submit">Edit Profile
                                </button>
                                <br/>
                                <br/>
                                <hr/>

                            </div>
                        </div>
                    </div>

                    <div className="row profile-body-under">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    Featured
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Special title treatment</h5>
                                    <p className="card-text">With supporting text below as a natural lead-in to
                                        additional content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header">
                                    Featured
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Special title treatment</h5>
                                    <p className="card-text">With supporting text below as a natural lead-in to
                                        additional content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>

                            <div className="card profile-body-card">
                                <div className="card-header">
                                    Featured
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Special title treatment</h5>
                                    <p className="card-text">With supporting text below as a natural lead-in to
                                        additional content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>

                            <div className="card profile-body-card">
                                <div className="card-header">
                                    Featured
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Special title treatment</h5>
                                    <p className="card-text">With supporting text below as a natural lead-in to
                                        additional content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {editProfile})(BodyProfile);