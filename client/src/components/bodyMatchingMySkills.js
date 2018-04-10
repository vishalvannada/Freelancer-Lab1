import React, {Component} from 'react';
import TopNavBar from "./topNavBar";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import JobsBelowNavBar from './jobsBelowNavBar';
import JobsBody from './jobsBody';
import Multiselect from 'react-widgets/lib/Multiselect';
import {searchMySkillsProjects} from '../actions/index'
import {loadAllProjects, searchProjects} from "../actions";
import {Field, reduxForm} from 'redux-form';
import _ from 'lodash';
import Computer from 'material-ui/svg-icons/hardware/computer';

const renderMultiselect = ({input, data, valueField, textField, meta}) => {

    return (
        <div>
            <Multiselect {...input}
                         placeholder='Type to filter projects by skills'
                         dropUp
                         onBlur={() => input.onBlur()}
                         value={input.value || []} // requires value to be an array
                         data={data}
                         valueField={valueField}
                         textField={textField}
                         default
            />
            <div className="error-message">
                {meta.touched ? meta.error : ''}
            </div>
        </div>
    )
}


class BodyJobsMatchingMySkills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
        }
    }

    componentWillMount() {
        this.insertValues()
    }


    insertValues() {

        console.log(this.props.projects)

        const data = {
            "projectName" : '',
            "skillsReq" : JSON.parse(this.props.projects.skills)
        }

        this.props.initialize(data);
    }


    renderField(field) {
        const className = `form-control`
        return (
            <div className="form-group form-group-custom">
                <input
                    className={className}
                    {...field.input}
                    placeholder={field.label}
                    type={field.type}
                />
            </div>
        )
    }

    two() {
        console.log("here")

        let list = [];

        console.log(this.props.projects)
        let i = (Number(this.props.projects.current) > 5 ? Number(this.props.projects.current) - 4 : 1)
        console.log(i)

        for (; i <= (Number(this.props.projects.current) + 4) && i < this.props.projects.pages; i++) {
            if (i === Number(this.props.projects.current)) {
                console.log("current")
                list.push(<li key={i} className="page-item disabled">
                    <button type="button" className="page-link"> {i} </button>
                </li>)
            } else {
                let p = i;
                let body = new FormData();
                let json_arr = this.props.projects.skills;
                body.append('projectName', this.state.projectName);
                body.append('skillsReq', json_arr);
                body.append('page', p);
                list.push(<li key={i} className="page-item">
                    <button type="button" className="page-link"
                            onClick={() => {
                                this.props.searchProjects(body)
                            }}
                    > {i} </button>
                </li>)
            }
            if (i === Number(this.props.projects.current) + 4 && i < this.props.projects.pages) {
                list.push(<li key={i + i} className="page-item disabled">
                    <button type="button" className="page-link">...</button>
                </li>)
            }
        }


        i = (Number(this.props.projects.current) > 5 ? Number(this.props.projects.current) - 4 : 1);
        let json_arr1 = this.props.projects.skills;
        let body1 = new FormData();
        body1.append('projectName', this.state.projectName);
        body1.append('skillsReq', json_arr1);
        body1.append('page', 1);

        let body2 = new FormData();
        body2.append('projectName', this.state.projectName);
        body2.append('skillsReq', json_arr1);
        body2.append('page', this.props.projects.pages);


        return (
            Number(this.props.projects.pages) > 0 ?

                <div className="text-align-right">
                    <ul className="pagination mt-3 extra-pagination">

                        {Number(this.props.projects.current) === 1 ?
                            <li className="page-item disabled">
                                <button className="page-link" type="button">First</button>
                            </li> :
                            <li className="page-item">
                                <button type="button" className="page-link"
                                        onClick={() => this.props.searchProjects(body1)}>First
                                </button>
                            </li>}

                        {i != 1 ?
                            <li className="page-item disabled">
                                <button type="button" className="page-link ">...</button>
                            </li> : ''}
                        {list}

                        {Number(this.props.projects.current) === Number(this.props.projects.pages) ?
                            <li className="disabled page-item">
                                <button type="button" className="page-link">Last</button>
                            </li> :
                            <li className="page-item">
                                <button type="button" className="page-link"
                                        onClick={() => this.props.searchProjects(body2)}
                                        to={`/jobs/${this.props.projects.pages}`}>Last
                                </button>
                            </li>}
                    </ul>
                </div>
                : ''
        );
    }

    onSubmit(data) {

        this.setState({
            projectName: data.projectName,
        })

        console.log(data.skillsReq, data.projectName)

        if(!data.skillsReq){
            data.skillsReq = []
        }

        if(!data.projectName){
            data.projectName = ''
        }
        var json_arr = JSON.stringify(data.skillsReq);
        var body = new FormData();
        body.append('projectName', data.projectName);
        body.append('skillsReq', json_arr);
        body.append('page', 1);
        console.log(body.get('skillsReq'))
        this.props.searchProjects(body)

    }

    renderProjects() {
        console.log(this.props.projects.projects)

        return _.map(this.props.projects.projects, project => {
            return (

                <li className="list-group-item" key={project._id}>
                    <div className="row font-size-14 p-2">
                        <div className="col-md-8">
                            <div className="text-align-left">
                                <MuiThemeProvider>
                                    <Computer/>
                                </MuiThemeProvider>
                            </div>
                            <div className="ml-5">
                                <Link to={`/jobs/single/${project._id}`}>
                                    <h4 className="text-primary">{project.projectName}</h4>
                                </Link>
                                <p>{project.projDesc}</p>
                                <span
                                    className="strong-weight">Skills Required : </span><span>{project.skillsReq.join(", ")}</span>
                                <br/>
                                <h6>Employer : <span className="text-primary">
                                    <Link to={`/users/${project.username}`}>
                                    {project.username}
                                    </Link>
                                </span></h6>
                                <span className="font-size-13">ProjectID : {project._id}</span>
                            </div>
                        </div>
                        <div className="col-md-2">
                            {project.bidcount}
                        </div>
                        <div className="col-md-2 text-center">
                            <p>{project.estBudget}</p>
                            <button type="button" className="btn btn-success font-size-14"
                                    onClick={() => this.props.history.push({
                                        pathname: `/jobs/single/${project._id}`,
                                        state: {toggle: true}
                                    })}>Bid Now
                            </button>
                            <br/>
                        </div>
                    </div>
                </li>

            )
        })
    }


    render() {

        console.log(this.props.projects)


        const {handleSubmit, pristine, reset, submitting} = this.props;
        console.log(this.props.projects.skills)

        return (
            <div>
                <div className="jobs">
                    <ul className="list-group jobs container p-3">

                        <span className="mt-2"></span>

                        <h2 className="mt-4">Freelance Jobs</h2>
                        <br/>

                        <h4>Browse Jobs on Freelancer</h4>
                        <hr className="mt-3"/>

                        <div className="mt-2">

                            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                <div className="text-align-left mt-1"><span className="strong-weight">Search</span></div>
                                <div className="container-search-project text-align-right ml-4">
                                    <Field
                                        label="Search for projects by name"
                                        name="projectName"
                                        component={this.renderField}
                                        type="text"
                                    />
                                </div>
                                <hr/>
                                <div className="strong-weight mt-2 text-align-left">Skills</div>
                                <div className="container-search-project text-align-right mb-2">
                                    <Field
                                        name="skillsReq"
                                        component={renderMultiselect}
                                        data={['Java', 'C', 'C++', 'JavaScript', 'C#', 'MERN Stack', 'MEAN Stack', 'LAMP Stack',
                                            'Website Design', 'Logo Design', 'Mobile App Development(Android)', 'Mobile App Development(ios)']}
                                    />
                                </div>
                                <br/>
                                <hr/>
                                <div>
                                    <button type="submit" disabled={pristine || submitting} className="btn mr-5">Submit
                                        Search
                                    </button>
                                    {/*<button type="button" onClick={reset} className="btn ml-5">Reset Values</button>*/}
                                    <button type="button" disabled={pristine || submitting} onClick={() => {
                                        this.props.reset();
                                        // this.setState({
                                        //     searching: false,
                                        //     projectName: '',
                                        //     skillsReq: []
                                        // })
                                        // this.props.loadAllProjects(1)
                                    }} className="btn ml-5">Reset Values
                                    </button>
                                </div>
                            </form>
                        </div>

                        <hr className="mt-2"/>
                        {/*{this.state.searching ? this.two() : this.one()}*/}
                        {this.two()}

                        <li className="list-group-item background-dark  mt-5">
                        <span className="row font-size-14 p-2">
                            <div className="col-md-8">PROJECT</div>
                            <div className="col-md-2">BIDS/ENTRIES</div>
                            <div className="col-md-2 text-center">PRICE(USD)</div>
                            {/*<div>{this.props.projects}</div>*/}
                        </span>
                        </li>

                        {this.renderProjects()}

                    </ul>
                </div>


            </div>
        )


    }
}


export default reduxForm({
    form: 'SearchMySkills',
})(
    connect(null, {searchMySkillsProjects,searchProjects})(BodyJobsMatchingMySkills)
);