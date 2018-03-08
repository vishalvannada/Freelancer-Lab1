import React, {Component} from 'react';
import {check, editProfile} from "../actions";
import {connect} from "react-redux";

class BodyProfile extends Component {

    handleEdit(){
        this.props.editProfile();
    }

    render() {
        return (
            <div>
                <div className="background-image">
                </div>
                <div className="container">
                    <div className="profile-body">
                        <div className="card profile-body-left">
                            <div className="row inside">
                                <div className="col-md-4">
                                    <img
                                        src="https://www.buira.org/assets/images/shared/default-profile.png"
                                        alt="..." className="d-block profile-profilepic"
                                    />
                                </div>

                                <div className="col-md-7">

                                </div>
                            </div>
                        </div>
                        <div className="card profile-body-right">
                            <div className="card-header">
                                <button className="edit-profile-button" onClick={this.handleEdit()} type="submit">Edit Profile</button>
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
                                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
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
                                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>

                            <div className="card profile-body-card">
                                <div className="card-header">
                                    Featured
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Special title treatment</h5>
                                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>

                            <div className="card profile-body-card">
                                <div className="card-header">
                                    Featured
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Special title treatment</h5>
                                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
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