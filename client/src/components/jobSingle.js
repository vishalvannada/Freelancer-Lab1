import React, {Component} from 'react';
import TopNavBar from "./topNavBar";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from "react-redux";
import {loadSingleProject, submitBid} from '../actions/index'
import {Field, reduxForm} from 'redux-form';
import _ from 'lodash'


var bidDone = false;

class JobSingle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
    }

    renderField1(field) {
        const className = `custom-input input-login ${field.meta.touched && field.meta.error ? 'border-red' : ''}`
        return (
            <div className="input-group font-size-13 custom-input-append mx-4 mr-0">
                <div className="input-group-prepend">
                    <span className="input-group-text font-size-13">$</span>
                </div>
                <input
                    className={className}
                    {...field.input}
                    type={field.type}
                />
                <div className="input-group-append">
                    <span className="input-group-text font-size-13">USD</span>
                </div>

                <div className="error-message">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        )
    }

    renderField2(field) {
        const className = `custom-input input-login ${field.meta.touched && field.meta.error ? 'border-red' : ''}`
        return (
            <div className="input-group font-size-13 custom-input-append mx-4 mr-0">
                <input
                    className={className}
                    {...field.input}
                    type={field.type}
                />
                <div className="input-group-append">
                    <span className="input-group-text font-size-13">Days</span>
                </div>

                <div className="error-message">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        )
    }

    renderFiles() {
        var i = 0;
        return _.map(this.props.singleProject.project.files, file => {
            return (
                <li className="mx-4" key={i}>
                    <a href={'http://localhost:3000/images/' + file} download target="_blank">
                        {'file' + i}
                        {i++}
                    </a>
                </li>
            )
        })
    }

    renderBids() {
        const buttonclass = this.props.singleProject.username == this.props.singleProject.project.username ? 'btn btn-success' : 'display-none btn btn-success';
        return _.map(this.props.singleProject.bids, bid => {
            return (
                <li className="list-group-item" key={bid._id}>
                    <div className="row">
                        <div className="col-md-5">
                            <img
                                className="image-bid"
                                src={bid.image == '' || bid.image == undefined ? 'https://www.buira.org/assets/images/shared/default-profile.png' : 'http://localhost:3000/images/' + bid.image}>
                            </img>
                            <br/>
                            <p>{bid.username}</p>
                        </div>

                        <div className="col-md-3">
                            <button type="button" className={buttonclass}>
                                Hire
                            </button>
                        </div>

                        <div className="col-md-4">
                            <span className="strong-weight">{bid.amount}</span>
                            <br/>
                            <span className="font-size-13">in {bid.period} days</span>
                        </div>
                    </div>

                </li>
            )
        })
    }

    componentDidMount() {
        console.log("Single Job")
        const {id} = this.props.match.params;
        this.props.loadSingleProject(id);
    }

    onSubmit(values) {
        values.projectid = this.props.singleProject.project._id;
        this.props.submitBid(values);
    }


    render() {

        console.log(this.props.singleProject.username)
        if (this.props.singleProject.isLoggingIn === true) {
            return <div>
                <MuiThemeProvider>
                    <CircularProgress/>
                </MuiThemeProvider>
            </div>
        }

        if (this.props.singleProject.isLoggedIn === false) {
            this.props.history.push('/login')
        }

        console.log(this.props.location.state)

        const {handleSubmit} = this.props;

        _.map(this.props.singleProject.bids, bid => {
            console.log(bid)
            if (bid.username == this.props.singleProject.username) {
                bidDone = true;
                console.log("hh")
            }
        });

        console.log(bidDone)

        let classForm = {};
        let buttonToggle = {};

        if (this.props.location.state) {
            classForm = (this.props.location.state.toggle === true || this.state.toggle === true) && !bidDone ? "" : "display-none";
            buttonToggle = this.props.location.state.toggle === true || this.state.toggle === true ? "bid-now-single display-none" : "bid-now-single";
        }
        else {
            classForm = this.state.toggle === true ? "" : "display-none";
            buttonToggle = this.state.toggle === true || (this.props.singleProject.username === this.props.singleProject.project.username) || bidDone ? "bid-now-single display-none" : "bid-now-single";
        }


        const {id} = this.props.match.params;
        const thisProject = this.props.singleProject.project;

        return (
            <div>
                <MuiThemeProvider>
                    <TopNavBar/>
                </MuiThemeProvider>

                <div className="container-post-project">
                    <h4 className="mt-5">{thisProject.projectName}</h4>


                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className={classForm}>
                        <div className="title-single-project mt-3">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mt-4 mx-4 alert alert-primary font-size-14" role="alert">
                                        <strong>NOTE: </strong>
                                        <span>Freelancer Project Fee will only be charged when you get
                                        awarded and accept the project</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5 font-size-13">
                                <span className="pt-4 px-4">
                                    <strong>Bid:</strong>
                                    <Field
                                        label="Email or Username"
                                        name="amount"
                                        component={this.renderField1}
                                        type="number"
                                    />
                                </span>
                                    <p className="px-4 mb-0">Paid to you:</p>
                                    <p className=" mt-0 px-4">Freelancer Project Fee: $ 0 USD</p>
                                    <hr className="ml-4"/>

                                    <button className="mx-4 mb-4 save-profile"
                                            type="submit">Place Bid
                                    </button>

                                </div>

                                <div className="col-md-5 font-size-13">
                                    <span className="pt-4 px-4">
                                    <strong>Deliver in:</strong>
                                    <Field
                                        name="days"
                                        type="number"
                                        component={this.renderField2}
                                    />
                                    </span>
                                </div>

                            </div>
                        </div>
                    </form>

                    <div className="title-single-project mt-3">
                        <div className="row">
                            <div className="col-md-6">
                                <h5 className="pt-4 px-4">
                                    Project Description
                                </h5>
                                <p className="px-4">
                                    {thisProject.projDesc}
                                </p>
                                <br/>
                                <h5 className="px-4">
                                    Skills Required
                                </h5>
                                <p className="px-4">
                                    {thisProject.skillsReq ? thisProject.skillsReq.map(skill => {
                                        return (
                                            <span key={skill}>
                                                {skill}
                                                <br/>
                                            </span>
                                        )
                                    }) : <span></span>}
                                </p>

                                <br/>
                                <h5 className="mx-4">
                                    Files Related to this project
                                </h5>
                                {this.renderFiles()}

                                <br/>
                                <p className="font-size-14 px-4">Project ID : {thisProject._id}</p>
                            </div>
                            <div className="col-md-6">
                                <button className={buttonToggle} onClick={() => this.setState({
                                    toggle: true
                                })}>
                                    <span>Bid on This Project</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <ul className="list-group">

                        <span className="mt-2"></span>
                        <li className="list-group-item background-dark  mt-3">
                        <span className="row font-size-14">
                            <div className="col-md-8">FREELANCERS BIDDING</div>
                            <div className="col-md-4">BID USD</div>
                            {/*<div>{this.props.projects}</div>*/}
                        </span>
                        </li>

                        {this.renderBids()}

                    </ul>
                </div>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};
    if (!values.amount) {
        errors.amount = "Enter Bid Amount";
    }

    if (isNaN(values.amount)) {
        errors.amount = "Enter a number"
    }
    if (!values.days) {
        errors.days = "Enter the days to deliver in";
    }
    return errors;
}

function mapStateToProps(state) {
    return {singleProject: state.singleProject}
}

export default reduxForm({
    validate,
    form: 'BidProject'
})(
    connect(mapStateToProps, {loadSingleProject, submitBid})(JobSingle)
);