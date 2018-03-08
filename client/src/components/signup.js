import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';
// import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {signupSubmit, check} from "../actions";


class SignUp extends Component {

    renderField(field) {
        const className = `form-control input-login ${field.meta.touched && field.meta.error ? 'border-red' : ''}`
        return (
            <div className="form-group form-group-custom">
                <input
                    className={className}
                    type={field.type}
                    {...field.input}
                    placeholder={field.label}
                />
                <div className="error-message">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        )
    }

    componentWillMount(){
        this.props.check();
    }

    onSubmit(values) {
        this.props.signupSubmit(values);
    }

    render() {

        const {handleSubmit} = this.props;

        console.log(this.props.loginDetails);

        if(this.props.loginDetails.isLoggedIn === true){
            this.props.history.push("/dashboard");
        }

        return (
            <div className="total">
                <div className="m-auto login-container">

                    <div className="logo-header">
                        <div className="logo-inside">
                            <img className="login-logo" src="https://cdn6.f-cdn.com/build/icons/fl-logo.svg"/>
                            <hr/>
                        </div>
                    </div>

                    <div className="text-center mt-2">
                        <strong><h6>Sign up for <i>free</i> today!</h6></strong>
                    </div>

                    <div className="logo-body">
                        <button id="fb-login-btn" className="fb-button"
                                data-uitest-target="facebook-login-button">
                            <span className="fl-icon-facebook"></span>Sign up with Facebook
                        </button>

                        <div className="hr-divider">
                            <hr data-content="OR" className="hr-text"/>
                        </div>


                        <div
                            className={this.props.loginDetails.errorMsg.length > 0 ? 'alert alert-danger' : 'display-none'}
                            role="alert">
                            <span>
                                {this.props.loginDetails.errorMsg}
                            </span>
                        </div>

                        <MuiThemeProvider>
                            {/*<LinearProgress mode="indeterminate"/>*/}

                            <div className={this.props.loginDetails.isLoggingIn == true ? "m-auto loading" : 'display-none'}>
                                <LinearProgress/>
                            </div>
                        </MuiThemeProvider>

                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Email Address"
                                name="email"
                                component={this.renderField}
                                type="email"
                            />

                            <Field
                                label="Username"
                                name="username"
                                component={this.renderField}
                                type="text"
                            />

                            <Field
                                label="Password"
                                name="password"
                                component={this.renderField}
                                type="password"
                            />

                            <Field
                                label="Confirm Password"
                                name="confirmPassword"
                                component={this.renderField}
                                type="password"
                            />

                            <div className="input-group hire-work">
                                <div className="input-group-prepend hire">
                                    <div className="input-group-text hire50 font-size-14">
                                        <input type="radio"
                                               name="profession"
                                               aria-label="Radio button for following text input"
                                               id="hire"
                                        />
                                        <span> Hire</span>
                                    </div>
                                </div>

                                <div className="input-group-append work">
                                    <div className="input-group-text work50 font-size-14">
                                        <input type="radio"
                                               name="profession"
                                               aria-label="Radio button for following text input"
                                               id="work"
                                        />
                                        <span> Work</span>
                                    </div>
                                </div>
                            </div>

                            <button className="login-button" type="submit">Create Account</button>


                            <p className="font-size-13">By registering you confirm that you accept the
                                <Link to=""> Terms and Conditions </Link>
                                and
                                <Link to=""> Privacy Policy</Link>
                            </p>

                        </form>

                        <br/>
                        <br/>
                        <hr/>

                        <div className="text-center">
                            <span>Already a Freelancer.com member?
                                <Link to="/login"> Log In</Link>
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

    if(!values.email){
        errors.email = "Please enter an email address";
    }
    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = "Please enter a valid email address";
    }
    if (!values.username) {
        errors.username = "Please enter a username!";
    }
    if (!values.password) {
        errors.password = "Please enter a password";
    }
    if (values.password) {
        if (values.password.length < 6) {
            errors.password = "Password must be 6 characters minimum";
        }
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = "Please re-enter a password";
    }
    if(values.confirmPassword){
        if(values.password != values.confirmPassword){
            errors.confirmPassword = "Please re-enter a password";
        }
    }
    return errors;
}

function mapStateToProps(state) {
    return {loginDetails: state.login}
}

export default reduxForm({
    validate,
    form: 'SignUpForm'
})(
    connect(mapStateToProps, {signupSubmit, check})(SignUp)
);

