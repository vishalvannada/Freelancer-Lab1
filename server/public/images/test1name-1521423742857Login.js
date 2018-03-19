import React, {Component} from 'react';

import * as API from '../api/API';

class Loginform extends Component {



    state = {
        username: '',
        password: '',
        inputA:'',
        inputB:'',
        mathOperator:''
    };

    componentWillMount(){
        this.setState({
            inputA: '',
            inputB: '',
            result:''
        });
    }
    handleMath = (caldata) => {
        console.log(caldata);
        API.doLogin(caldata)
            .then((res) => {

                //if (status === 201)
                {
                    console.log(res);
                    this.setState({
                        isLoggedIn: true,
                        inputA: caldata.inputA,
                        inputB: caldata.inputB,
                        result: res.result,
                        message: res.message

                    });
                    console.log("stssdf 201");
                    console.log(this.state.result);
                    // this.props.history.push("/welcome");

                }// else if (status === 401)
                /* {
                     console.log("status 401");
                     this.setState({
                         isLoggedIn: false,
                         message: "Wrong username or password. Try again..!!"
                     });

                 }*/
            });
    };
    handleOptionChange= (changeEvent) => {
        console.log(changeEvent.target.value);
        this.setState(
            {mathOperator: changeEvent.target.value}
        );
    };

    render() {
        return (
            <div className="container" id="loginBody">
                <div className="col-sm-3 col-md-3 ">

                </div>
            <div className="row justify-content-md-center col-sm-6 col-md-6 mt-5 mb-5">

                <main id="main" className="main-content col-sm-10 col-md-10">



                    <div id="login_form_container" className="header-login-form col-sm-12 col-md-12"><div>
                        <div className="modal-header col-sm-11 col-md-11">

                            <div id="fl-logo" className="modal-header-logo col-sm-12 col-md-12">
                                <img className="flicon-logo-fullcolor" src="https://cdn6.f-cdn.com/build/icons/fl-logo.svg"/>
                            </div>

                        </div>
                        <div className="modal-body col-sm-11 col-md-11 ">

                            <button id="fb-login-btn" className="btn-facebook btn btn-large gaf-fb-connected-button col-sm-11 col-md-11" data-uitest-target="facebook-login-button">
                                <span className="fl-icon-facebook"></span>Login with Facebook</button>
                            <div className="hr-divider col-sm-12 col-md-12 mt-4">
                                <span className="hr-divider-text">OR</span>
                            </div>


                            <form id="login_form" className="user-login-form fl-form large-form responsive-form col-sm-12 col-md-12 mt-4">

                                <fieldset>
                                    <ol>
                                        <li className="form-step username-step">
                                            <label for="username" className="is-accessibly-hidden">Username</label>
                                            <input type="text" placeholder="Email or Username" name="username" maxlength="150" id="username" className="large-input"/>
                                                <div className="form-error username-error"></div>

                                        </li><li className="form-step password-step">
                                        <label for="passwd" className="is-accessibly-hidden">Password</label>
                                        <input type="password" placeholder="Password" name="password" maxlength="150" id="passwd" className="large-input"/>
                                            <div className="form-error password-error"></div>

                                    </li><li className="form-step">
                                        <button id="login_btn" type="submit" className="btn btn-info btn-large btn-submit">
                                            Log In
                                        </button>
                                    </li><li className="form-step has-label login-form-options">

                                        <label for="loginpermanent" className="login-form-remember checkbox">
                                            <input className="user-login-perm-checkbox" type="checkbox" name="savelogin" id="loginpermanent"/>Remember me
                                        </label>

                                        <a href="#" id="forgot-password-btn" className="login-form-forgot forgot-password">Forgot Password?</a>
                                    </li></ol>
                                </fieldset>
                            </form>

                            <span className="login-form-signup-link">
                         Don't have an account?
                              <a href="#" className="switch-to-login">Sign Up</a>
                                       </span>

                               </div>


                    </div>
                                    </div>
                                 </main>



                            </div>



            </div>
        );
    }
}

export default Loginform;