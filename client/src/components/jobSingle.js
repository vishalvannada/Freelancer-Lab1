import React, {Component} from 'react';
import TopNavBar from "./topNavBar";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Ascending from 'material-ui/svg-icons/navigation/arrow-downward';
import Descending from 'material-ui/svg-icons/navigation/arrow-upward';
import {connect} from "react-redux";
import {loadSingleProject, submitBid, hireFreelancer,unloadSingleProject} from '../actions/index'
import {Field, reduxForm} from 'redux-form';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import FreelancerSingleJob from './freelancerSingleJob'

class JobSingle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            ascending: false,
            descending: false,
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
                        <div className="col-md-2">
                            <img
                                className="image-bid"
                                src={bid.image == '' || bid.image == undefined ? 'https://www.buira.org/assets/images/shared/default-profile.png' : 'http://localhost:3000/images/' + bid.image}>
                            </img>
                            <br/>
                            {/*<p>{bid.username}</p>*/}
                        </div>

                        <div className="col-md-3">
                            <Link to={`/users/${bid.username}`}>
                                <p>{bid.username}</p>
                            </Link>
                        </div>

                        <div className="col-md-4">
                            <button type="button" className={buttonclass} onClick={() => {
                                // this.setState({
                                //     toggle: false
                                // })
                                this.props.hireFreelancer(bid, this.props.singleProject.project)
                            }}>
                                Hire
                            </button>
                        </div>

                        <div className="col-md-3">
                            <span className="strong-weight">$USD {bid.amount}</span>
                            <br/>
                            <span className="font-size-13">in {bid.period} days</span>
                        </div>
                    </div>

                </li>
            )
        })
    }

    componentWillMount() {
        console.log("Single Job")
        const {id} = this.props.match.params;
        this.props.loadSingleProject(id);
    }

    componentWillUnmount() {
        // this.props.singleProject = undefined
        this.props.unloadSingleProject()
    }

    sortAscending() {
        // console.log(this.props.singleProject.bids)
        this.props.singleProject.bids.sort(function (a, b) {
            return a.amount - b.amount;
        })
        // console.log(this.props.singleProject.bids)
        this.setState({
            ascending: true
        })
    }

    sortDescending() {
        this.props.singleProject.bids.sort(function (a, b) {
            return b.amount - a.amount;
        })
        // console.log(this.props.singleProject.bids)
        this.setState({
            descending: true
        })
    }

    onSubmit(values) {
        values.projectid = this.props.singleProject.project._id;
        this.setState({
            toggle: false
        })
        this.props.submitBid(values);
    }


    renderEmployeeSection(owner, bidder, bidAmount, projectid) {

        return (
            <div>
                <ul className="list-group">

                    <li className="list-group-item background-dark  mt-3">
                        <span className="row">
                            <div
                                className="col-md-9">SUBMISSIONS BY FREELANCER {this.props.singleProject.project.freelancer}</div>
                            {/*<div>{this.props.projects}</div>*/}
                        </span>
                    </li>

                    <li className="list-group-item font-size-13">
                        Submission 1
                    </li>

                    <li className="list-group-item font-size-13">
                        Submission 2
                    </li>

                </ul>

                {/*<br/>*/}
                <br/>
                <button type="button" className='btn btn-success' onClick={() => this.props.history.push({
                    pathname : "/pay",
                    state : {
                        owner, bidder, bidAmount, projectid
                    }
                })}>
                    Make Payment
                </button>

            </div>
        );
    }


    renderFreelancerSection() {
        return (
            <div>
                <FreelancerSingleJob/>
            </div>
        )
    }

    renderNormalSection() {

        const style = {
            margin: 4,
        };

        return (
            <div>
                <div>
                    <MuiThemeProvider>
                        <RaisedButton label="Sort" secondary={true} style={style}/>
                        <RaisedButton label="Ascending" primary={true} style={style} icon={<Ascending/>}
                                      onClick={() => this.sortAscending()}/>
                        <RaisedButton label="Descending" primary={true} style={style} icon={<Descending/>}
                                      onClick={() => this.sortDescending()}/>
                    </MuiThemeProvider>
                </div>

                <ul className="list-group">

                    {/*<span className="mt-2"></span>*/}
                    <li className="list-group-item background-dark  mt-3">
                        <span className="row font-size-14">
                            <div className="col-md-9">FREELANCERS BIDDING</div>
                            <div className="col-md-3">BID USD</div>
                            {/*<div>{this.props.projects}</div>*/}
                        </span>
                    </li>

                    {this.renderBids()}

                </ul>
            </div>
        )
    }

    renderCondition(bidDone, bidAmount) {
        if (this.props.singleProject.project.status) {
            if (this.props.singleProject.project.status == 'OPEN') {
                return (
                    <div>{this.renderNormalSection()}</div>
                )

            }

            if (this.props.singleProject.project.status == 'IN PROGRESS' && this.props.singleProject.username == this.props.singleProject.project.username) {

                let owner = this.props.singleProject.project.username;
                let bidder = this.props.singleProject.project.freelancer;
                return (
                    <div>{this.renderEmployeeSection(owner, bidder, bidAmount, this.props.singleProject.project._id)}</div>
                )
            }

            if (this.props.singleProject.project.status == 'IN PROGRESS' && bidDone) {
                return (
                    <div>{this.renderFreelancerSection()}</div>
                )
            }

            if (this.props.singleProject.project.status == 'CLOSED') {
                return (
                    <div></div>
                )
            }
        }
    }


    render() {

        var bidDone = false;

        console.log(this.state, this.props.singleProject)
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

        var bidAmount ;

        _.map(this.props.singleProject.bids, bid => {
            // console.log(bid)
            if (bid.username == this.props.singleProject.username) {
                bidDone = true;
                // console.log(bid)
            }
            if(this.props.singleProject.project.freelancer){
                if(bid.username == this.props.singleProject.project.freelancer){
                    console.log(bid.amount);
                    bidAmount = bid.amount;
                }
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

        if (this.props.singleProject.project.status != 'OPEN') {
            classForm = "display-none";
            buttonToggle = "display-none";
        }

        const {id} = this.props.match.params;
        const thisProject = this.props.singleProject.project;

        return (
            <div>
                <MuiThemeProvider>
                    <TopNavBar history={this.props.history}/>
                </MuiThemeProvider>

                <div className="container-single-project">
                    <h4 className="mt-5">{thisProject.projectName}</h4>


                    <div className="title-single-project">
                        <div className="row">
                            {/*<div className="col-md-1.5 inside-details ml-5 mr-4 my-2 pr-4 font-size-14">*/}
                            {/*<span className="ml-2">Bids</span>*/}
                            {/*<h4 className="text-primary text-center">141</h4>*/}
                            {/*</div>*/}
                            <div className="col-md-1.5 inside-details ml-5 mr-4 my-2 pr-4 font-size-14">
                                <span>Avg Bid</span>
                                <h4 className="text-primary text-center">{Math.round(this.props.singleProject.avgBid, 1)}</h4>
                            </div>
                            <div className="col-md-2.5 inside-details mr-4 my-2 pr-4 font-size-14">
                                <span className="ml-2">Project Budget</span>
                                <h4 className="text-primary text-center"> $ {thisProject.estBudget}</h4>
                            </div>

                            <div className="col-md-3 text-align-right">
                                <br/>
                                <h5>STATUS : {this.props.singleProject.project.status}</h5>
                            </div>

                            <div className="col-md-3 text-align-right">
                                <br/>
                                <h6>OWNER : {this.props.singleProject.project.username}</h6>
                            </div>
                        </div>
                    </div>

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

                    <br/>

                    {/*{this.renderEmployeeSection()}*/}
                    {/*{this.renderFreelancerSection()}*/}
                    {/*{this.renderNormalSection()}*/}

                    {this.renderCondition(bidDone, bidAmount)}


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
    connect(mapStateToProps, {loadSingleProject, submitBid, hireFreelancer, unloadSingleProject})(JobSingle)
);
