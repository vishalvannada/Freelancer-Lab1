import React, {Component} from 'react';
import {Field, reduxForm, initialize} from 'redux-form';
import {check, loginSubmit} from "../actions";
import {connect} from "react-redux";
import {FileUpload} from 'redux-file-upload';
import {profileCheck, uploadImage, profileSave} from "../actions";
import FormData from 'form-data'
import * as API from '../api/API';
import Edit from 'material-ui/svg-icons/editor/mode-edit';

import TextField from 'material-ui/TextField';


class BodyProfileEdit extends Component {

    renderField(field) {
        const className = `form-control input-login ${field.meta.touched && field.meta.error ? 'border-red' : ''}`
        return (
            <div className="form-group form-group-custom">
                <input
                    className={className}
                    {...field.input}
                    placeholder={field.label}
                    type={field.type}
                />
                <div className="error-message">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        )
    }

    renderText(field) {
        const className = `form-control ${field.meta.touched && field.meta.error ? 'border-red' : ''}`
        return (
            <div className="form-group form-group-custom">
                <textarea
                    className={className}
                    {...field.input}
                    placeholder={field.label}
                    type={field.type}
                />
                <div className="error-message">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        )
    }

    insertValues() {

        console.log(this.props.profile)
        const data = {
            "username": this.props.profile.userDetails.username,
            "email": this.props.profile.userDetails.email,
            "phoneNumber": this.props.profile.userDetails.phoneNumber,
            "aboutMe": this.props.profile.userDetails.aboutMe,
            "skills": this.props.profile.userDetails.skills
        }

        this.props.initialize(data);
    }

    componentWillMount() {
        console.log("yes")
        this.insertValues();
    }

    onButtonClick() {
        this.props.profileCheck();
    }

    onSubmit(values) {
        this.props.profileSave(values)
    }


    handleFileUpload = (event) => {

        const payload = new FormData();

        console.log(payload)
        payload.append('mypic', event.target.files[0]);
        console.log(event.target.files)
        console.log(event.target.files[0])
        console.log(payload.get('mypic'))

        this.props.uploadImage(payload);

        // API.uploadFile(payload)
        //     .then((status) => {
        //         if (status === 204) {
        //             console.log("vishl")
        //         }
        //     }).catch((error) => {
        //     console.log("shdvASYTD")
        // });

    };


    render() {
        console.log(this.props.profile)
        const {handleSubmit} = this.props;

        let src = 'https://www.buira.org/assets/images/shared/default-profile.png';
        if(this.props.profile.userDetails.image) {
            src = 'http://localhost:3000/images/' + this.props.profile.userDetails.image;
        }


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
                                    <div>
                                        <label for = "file-upload" className="custom-file-upload">
                                            <Edit className="icon-edit"/>
                                            <span className="file-button">Edit Profile Picture</span>
                                        </label>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            name="mypic"
                                            onChange={this.handleFileUpload}
                                            accept="image/x-png,image/gif,image/jpeg"
                                        />
                                    </div>
                                </div>


                                <div className="col-md-7">

                                    <form className="edit-profile" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                        <Field
                                            label="This is your Name"
                                            name="username"
                                            component={this.renderField}
                                            type="text"
                                        />

                                        <Field
                                            label="Email Address"
                                            name="email"
                                            component={this.renderField}
                                            type="email"
                                        />

                                        <Field
                                            label="Phone Number"
                                            name="phoneNumber"
                                            component={this.renderField}
                                            type="tel"
                                        />


                                        <Field
                                            label="Bio Ex: I am an experienced Salesforce Developer"
                                            name="aboutMe" component={this.renderText}/>


                                        <Field
                                            label="Skills"
                                            name="skills" component={this.renderText}/>


                                        <button className="save-profile"
                                                type="submit">Save
                                        </button>

                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="card profile-body-right">
                            <div class="card-header">
                                <button className="edit-profile-button"
                                        type="submit"
                                        onClick={() => this.onButtonClick()}
                                >View Profile
                                </button>
                                <br/>
                                <br/>
                                <hr/>
                            </div>
                        </div>
                    </div>

                    <div className="row profile-body-under">
                        <div className="col-md-8">
                            <div class="card">
                                <div class="card-header">
                                    Featured
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional
                                        content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">

                            <div class="card">
                                <div class="card-header">
                                    Featured
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional
                                        content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>

                            <div class="card profile-body-card">
                                <div class="card-header">
                                    Featured
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional
                                        content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>

                            <div class="card profile-body-card">
                                <div class="card-header">
                                    Featured
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional
                                        content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function validate(values) {

    //object that returns errors, if errors is empty the form will be submitted, else it wont be submitted
    //if errors has any properties, redux from assumes that form is invalid
    const errors = {};

    //names are associated to fields in the redux form names
    if (!values.username) {
        errors.username = "UserName can't be empty";
    }

    if (values.username) {
        if (values.username.length < 6) {
            errors.username = "Username should be of 6 letters or more!";
        }
    }

    if (!values.email) {
        errors.email = "Email can't be empty";
    }
    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = "Please enter a valid email address";
    }
    if(isNaN(values.phoneNumber)){
        errors.phoneNumber = "Please Enter a valid phone number"
    }
    return errors;
}


export default reduxForm({
    validate,
    form: 'ProfileForm'
})(
    connect(null, {profileCheck, uploadImage, profileSave})(BodyProfileEdit)
);

