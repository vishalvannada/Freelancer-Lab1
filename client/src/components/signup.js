import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


class SignUp extends Component {

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

        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
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
                        <button id="fb-login-btn" class="fb-button"
                                data-uitest-target="facebook-login-button">
                            <span class="fl-icon-facebook"></span>Sign up with Facebook
                        </button>

                        <div className="hr-divider">
                            <hr data-content="OR" className="hr-text"/>
                        </div>

                        <form>
                            <Field
                                label="Email Address"
                                name="email"
                                component={this.renderField}
                            />

                            <Field
                                label="Username"
                                name="username"
                                component={this.renderField}
                            />

                            <Field
                                label="Password"
                                name="password"
                                component={this.renderField}
                            />

                            <Field
                                label="Confirm Password"
                                name="confirmPassword"
                                component={this.renderField}
                            />

                            <div class="input-group hire-work">
                                <div class="input-group-prepend hire">
                                    <div class="input-group-text hire50">
                                        <input type="radio"
                                               name="profession"
                                               aria-label="Radio button for following text input"
                                               id="hire"
                                        />
                                        <label> Hire</label>
                                    </div>
                                </div>

                                <div class="input-group-append work">
                                    <div class="input-group-text work50">
                                        <input type="radio"
                                               name="profession"
                                               aria-label="Radio button for following text input"
                                               id="work"
                                        />
                                        <label> Work</label>
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
    form: 'SignUpForm'
})(
    SignUp
    // connect(null, {createPost})(PostsNew)
);
