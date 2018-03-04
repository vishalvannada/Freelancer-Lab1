import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginSubmit} from "../actions";

class Login extends Component {

    renderField(field) {
        const className = `form-control input-login ${field.meta.touched && field.meta.error ? 'border-red' : ''}`
        return (
            <div className="form-group">
                <input
                    className={className}
                    type="text"
                    {...field.input}
                    placeholder={field.label}
                />
                <div className="error-message">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        this.props.loginSubmit(values, () => {
            this.props.history.push('/home');
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
                        <button id="fb-login-btn" class="fb-button"
                                data-uitest-target="facebook-login-button">
                            <span class="fl-icon-facebook"></span>Login with Facebook
                        </button>

                        <div className="hr-divider">
                            <hr data-content="OR" className="hr-text"/>
                        </div>

                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Email or Username"
                                name="username"
                                component={this.renderField}
                            />

                            <Field
                                label="Password"
                                name="password"
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
        errors.username = "Enter a title!";
    }
    if (!values.password) {
        errors.password = "Enter some cats";
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'LoginForm'
})(
    connect(null, {loginSubmit})(Login)
);
