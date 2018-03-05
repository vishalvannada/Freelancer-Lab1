import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginSubmit} from "../actions";

class Login extends Component {

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

    onSubmit(values) {
        this.props.loginSubmit(values, () => {
            this.props.history.push('/dashboard');
        });
    }

    render() {

        const {handleSubmit} = this.props;

        return (
            <div className="total">
                <div className="m-auto login-container">

                    <div className="logo-header">
                        <div className="logo-inside">
                            <img className="login-logo" src="https://cdn6.f-cdn.com/build/icons/fl-logo.svg"/>
                            <hr/>
                        </div>
                    </div>

                    <div className="logo-body">
                        <button id="fb-login-btn" className="fb-button"
                                data-uitest-target="facebook-login-button">
                            <span>Login with Facebook</span>
                        </button>

                        <div className="hr-divider">
                            <hr data-content="OR" className="hr-text"/>
                        </div>

                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Email or Username"
                                name="username"
                                component={this.renderField}
                                type="text"
                            />

                            <Field
                                label="Password"
                                name="password"
                                type="password"
                                component={this.renderField}
                            />

                            <button className="login-button" type="submit">Log In</button>

                        </form>

                        <br/>
                        <br/>
                        <hr/>

                        <div className="text-center">
                            <span>Don't have an account?
                                <Link to="/signup"> Sign Up</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


//helper for validation
//values are details that user enter in form
function validate(values) {

    //object that returns errors, if errors is empty the form will be submitted, else it wont be submitted
    //if errors has any properties, redux from assumes that form is invalid
    const errors = {};

    //names are associated to fields in the redux form names
    if (!values.username) {
        errors.username = "Please enter your username or email";
    }
    if (!values.password) {
        errors.password = "Please enter your password";
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'LoginForm'
})(
    connect(null, {loginSubmit})(Login)
);
