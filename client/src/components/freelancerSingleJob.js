import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {Field, reduxForm} from 'redux-form';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import FileInput from './dropzone'
import Dropzone from 'react-dropzone';
import Icon from 'material-ui/svg-icons/content/add';
import Info from 'material-ui/svg-icons/action/info-outline';
import {postProject, postProjectcheck} from '../actions/index';
import {scroller} from 'react-scroll';
// import _ from 'lodash';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';

const FILE_FIELD_NAME = 'files';
let arrayFiles = [];

const renderDropzoneInput = (field) => {
    console.log(field.input.value)
    const newFile = field.input.value;
    arrayFiles.push(...newFile);
    console.log(...newFile);
    console.log(field.input.value[0])
    let files = arrayFiles;
    console.log(files);
    return (
        <div>
            <div className="dropzone-files">
                <Dropzone
                    className="dropzone-button"
                    name={field.name}
                    onDrop={(filesToUpload, e) => field.input.onChange(filesToUpload)}>
                    <div>
                        <MuiThemeProvider>
                            <Icon color="action">add_circle</Icon>
                        </MuiThemeProvider>
                        <div className="text-dropzone">Upload Files</div>
                    </div>
                    {/*<div>{field.label}</div>*/}
                </Dropzone>
                <div className="text-dropzone-inside">
                    Drag & drop any images or documents that might be
                    helpful in explaining your project brief here
                </div>

                {field.meta.touched &&
                field.meta.error &&
                <span className="error">{field.meta.error}</span>}

            </div>
            <div>
                {files && Array.isArray(files) && (
                    <ul className="list-group">
                        {files.map((file, i) => <li className="list-group-item" key={i}>
                            <span className="text-align-left">{file.name}</span>
                            <span className="text-align-right">
                                <button onClick={() => {
                                    let index = arrayFiles.indexOf(file);
                                    console.log(index);
                                    if (index > -1) {
                                        arrayFiles.splice(index, 1)
                                    }
                                    console.log(arrayFiles)
                                }} className="btn btn-danger">Delete</button>
                            </span>
                        </li>)}
                    </ul>
                )}
            </div>
        </div>
    );
}

class FreelancerSingleJob extends Component {

    componentWillUnmount() {
        arrayFiles = [];
    }

    onSubmit(data) {
        var body = new FormData();
        console.log(data)
        console.log(arrayFiles)

        arrayFiles.forEach((element) => {
            body.append('uploads', element)
        })

        body.append('text', data.text);
        this.props.postProject(body);
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
                    rows="5"
                />
                <div className="error-message">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        )
    }


    render() {


        const {handleSubmit} = this.props;

        const styles = {
            block: {
                maxWidth: 250,
            },
            radioButton: {
                marginBottom: 6,
            },
            name: {
                marginTop: 10,
            }
        };


        return (
            <div>

                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                    <h5>Submit Your Views on Project</h5>
                    <Field
                        label="Submit Your Project"
                        name="text"
                        component={this.renderText}/>


                    <h5>Upload Files related to project</h5>
                    <Field
                        name={FILE_FIELD_NAME}
                        component={renderDropzoneInput}
                    />

                    <br/>
                    <button className="btn btn-success" type="submit">Submit Project</button>

                </form>

            </div>
        )
    }
}

function validate(values) {

    const errors = {};

    //names are associated to fields in the redux form names
    if (!values.text) {
        errors.projectName = "Please enter the name of the project";
    }


    return errors;
}

export default reduxForm({
    validate,
    form: 'JustAForm',
})(
    connect(null, {})(FreelancerSingleJob)
);