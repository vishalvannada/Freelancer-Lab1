import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import _ from 'lodash';
import Computer from 'material-ui/svg-icons/hardware/computer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Field, reduxForm} from 'redux-form';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';
import {searchProjects} from '../actions'

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
            />
            <div className="error-message">
                {meta.touched ? meta.error : ''}
            </div>
        </div>
    )
}

class JobsBody extends Component {

    onSubmit(data) {
        // var body = new FormData();

        var body = new FormData();
        console.log(this.props.page)
        body.append('projectName', data.projectName);
        body.append('skillsReq', data.skillsReq);
        body.append('page', this.props.page);
        // console.log(body.get('projectName'))
        this.props.searchProjects(body)
        // console.log(arrayFiles)
        //
        // arrayFiles.forEach((element) => {
        //     body.append('uploads', element)
        // })
        //
        // body.append('projectName', data.projectName);
        // body.append('projDesc', data.projDesc);
        // body.append('skillsReq', data.skillsReq);
        // console.log(data.estBudget)
        // body.append('estBudget', data.estBudget);
        //
        // // body.append('bodyy',data)
        // // body.append('proj',data)
        //
        // console.log(body.get('uploads'))
        // this.props.postProject(body);

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

    renderProjects() {
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


    one() {

        let list = [];

        let i = (Number(this.props.projects.current) > 5 ? Number(this.props.projects.current) - 4 : 1)

        for (; i <= (Number(this.props.projects.current) + 4) && i < this.props.projects.pages; i++) {
            if (i === this.props.projects.current) {
                list.push(<li className="page-item active"><a type="button"> {i} </a></li>)
            } else {
                list.push(<li key={i} className="page-item"><Link type="button" className="page-link"
                                                                  to={`/jobs/${i}`}> {i} </Link></li>)
            }
            if (i === Number(this.props.projects.current) + 4 && i < this.props.projects.pages) {
                list.push(<li className="page-item disabled"><a type="button" className="page-link">...</a></li>)
            }
        }

        console.log(list)

        i = (Number(this.props.projects.current) > 5 ? Number(this.props.projects.current) - 4 : 1)
        return (
            this.props.projects.pages > 0 ?

                <div className="text-align-right">
                    <ul className="pagination mt-3 extra-pagination">

                        {this.props.projects.current === 1 ?
                            <li className="page-item disabled"><a type="button">First</a></li> :
                            <li className="page-item"><Link type="button" className="page-link"
                                                            to="/jobs/1">First</Link>
                            </li>}

                        {i != 1 ?
                            <li className="page-item disabled"><a type="button" className="page-link ">...</a>
                            </li> : ''}
                        {list}

                        {this.props.projects.current === this.props.projects.pages ?
                            <li className="disabled page-item"><a type="button" className="page-link">Last</a></li> :
                            <li className="page-item"><button type="button" className="page-link" onClick={() => this.props.onSubmit()}
                                                            to={`/jobs/${this.props.projects.pages}`}>Last</button></li>}
                    </ul>
                </div>
                : ''
        );
    }


    componentWillMount() {
        console.log("here")
    }

    render() {
        console.log(this.props.projects)

        const {handleSubmit, pristine, reset, submitting} = this.props;
        return (
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
                                <button type="submit" className="btn mr-5">Submit Search</button>
                                <button type="button" onClick={reset} className="btn ml-5">Reset Values</button>
                            </div>
                        </form>
                    </div>

                    <hr className="mt-2"/>
                    {this.one()}
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
        )
    }
}

export default reduxForm({
    form: 'SearchProjectsForm',
})(
    connect(null, {searchProjects})(JobsBody)
);
