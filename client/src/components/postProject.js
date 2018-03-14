import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {Field, reduxForm} from 'redux-form';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import FileInput from './dropzone'
import Dropzone from 'react-dropzone';
import Icon from 'material-ui/svg-icons/content/add';
import {postProject, postProjectcheck} from '../actions/index'

const FILE_FIELD_NAME = 'files';
let arrayFiles = [];

const renderDropzoneInput = (field) => {
    console.log(field.input.value)
    const newFile = field.input.value;
    arrayFiles.push(...newFile);
    console.log(...newFile);
    console.log( field.input.value[0])
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

class PostProject extends Component {

    componentWillMount() {
        this.props.postProjectcheck();
    }

    onSubmit(data) {
        var body = new FormData();
        console.log(data)
        console.log(arrayFiles)

        arrayFiles.forEach((element)=> {
            body.append('uploads', element)
        })

        body.append('projectName', data.projectName);
        body.append('projDesc', data.projDesc);
        body.append('skillsReq', data.skillsReq);
        console.log(data.estBudget)
        body.append('estBudget', data.estBudget);

        // body.append('bodyy',data)
        // body.append('proj',data)

        console.log(body.get('uploads'))
        this.props.postProject(body);

    }


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

        if(this.props.loginValid.isLoggingIn === true){
            return(
                <div>
                    Loading...
                </div>
            )
        }

        if(this.props.loginValid.isLoggedIn === false){
            this.props.history.push("/login")
        }

        if(this.props.loginValid.isCompleted === true){
            this.props.history.push("/dashboard")
        }
        const {handleSubmit, reset} = this.props;

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
            <div className="full-body">
                <Link to="/dashboard">
                    <img className="logo-left-post brand"
                         src="https://www.f-cdn.com/assets/webapp/assets/freelancer-logo.svg" alt="Freelancer Logo"
                         data-display="block"

                    />
                </Link>

                <div className="container-post-project">
                    <h2>Tell us what you need done</h2>
                    <p className="mt-3">Get free quotes from skilled freelancers within minutes, view profiles, ratings
                        and portfolios
                        and chat with them. Pay the freelancer only when you are 100% satisfied with their work.</p>

                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>


                        <h5 className="mt-5">Choose a name for your project</h5>
                        <Field
                            label="e.g. Build me a website"
                            name="projectName"
                            component={this.renderField}
                            type="text"
                        />

                        <h5 className="mt-5">Tell us more about your project</h5>
                        <p className="font-size-14 mb-4">Great project descriptions include a little bit about yourself,
                            details of what you are
                            trying to achieve, and any decisions that you have already made about your project. If there
                            are things you are unsure of, don't worry, a freelancer will be able to help you fill in the
                            blanks.</p>
                        <Field
                            label="Describe your project here..."
                            name="projDesc"
                            component={this.renderText}/>


                        <Field
                            name={FILE_FIELD_NAME}
                            component={renderDropzoneInput}
                        />


                        <h5 className="mt-5">What skills are required?</h5>
                        <p className="font-size-14 mb-4">Enter up to 5 skills that best describe your project.
                            Freelancers
                            will use these skills to
                            find projects they are most interested and experienced in.</p>
                        <Field
                            label="e.g. Build me a website"
                            name="skillsReq"
                            component={this.renderField}
                            type="text"
                        />
                        <p className="font-size-14 mb-5">Suggested skills: Website Design , Logo Design , Mobile App
                            Development , Data Entry ,
                            Article Writing</p>


                        <h5>How do you want to pay?</h5>
                        <MuiThemeProvider>
                            <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                                <RadioButton
                                    value="not_light"
                                    label="Fixed price project"
                                    labelStyle={styles.name}
                                    style={styles.radioButton}
                                />
                                <RadioButton
                                    value="light"
                                    label="Hourly Project"
                                    labelStyle={styles.name}
                                    style={styles.radioButton}
                                />
                            </RadioButtonGroup>
                        </MuiThemeProvider>


                        <h5 className="mt-5">What is your estimated budget?</h5>
                        <Field name="estBudget" component="select" className="form-control form-control-lg">
                            <option value="">Select Budget</option>
                            <option value="$20 - 80 USD">Basic ($20 - 80 USD)</option>
                            <option value="$80 - 150 USD">Moderate ($80 - 150 USD)</option>
                            <option value="$150 - 250">Standard ($150 - 250 USD)</option>
                            <option value="$250 - 500 USD">Skilled ($250 - 500 USD)</option>
                            <option value="$500+  USD">Expert ($500
                                + USD)</option>
                        </Field>

                        <button className="post-project-button mt-5" type="submit">Post My Project</button>

                    </form>

                </div>
            </div>
        )
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


function mapStateToProps(state) {
    return {loginValid: state.postProject}
}

export default reduxForm({
    validate,
    form: 'PostProjectForm'
})(
    connect(mapStateToProps, {postProject, postProjectcheck})(PostProject)
);