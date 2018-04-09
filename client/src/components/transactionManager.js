import React, {Component} from 'react';
import TopNavBar from "./topNavBar";
import {getTransactions, addWithdrawMoney} from "../actions";
import {connect} from "react-redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactSvgPieChart from "react-svg-piechart";
import {Tabs, Tab} from 'material-ui/Tabs';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {reset} from 'redux-form';


var inM = 1;
var outM = 1;

class TransactionManager extends Component {

    componentDidMount() {
        console.log("here");
        this.props.getTransactions();
    }

    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
            done: false
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    renderIncoming(moneyIn) {

        inM = 0;
        let money = 0;

        return _.map(this.props.transactions.transIn, tran => {

            inM += tran.amount;
            money += tran.amount;
            moneyIn = {money: money}
            return (
                <div key={tran}>
                    <li className="list-group-item" key={tran}>
                        <span className="row font-size-14">
                            <div className="col-md-4 strong-weight">{tran.owner}</div>
                            <Link to={`/jobs/single/${tran.projectid}`}>
                            <div className="col-md-4 strong-weight">{tran.projectid}</div>
                            </Link>
                            <div className="col-md-4 strong-weight">{tran.amount}</div>
                        </span>
                    </li>
                </div>
            )
        })

    }

    renderOutgoing(moneyOut) {

        let money = 0;

        outM = 0;
        return _.map(this.props.transactions.transOut, tran => {
            outM += tran.amount;
            money += tran.amount;
            moneyOut = {money: money}
            return (
                <div key={tran}>
                    <li className="list-group-item" key={tran}>
                        <span className="row font-size-14">
                            <div className="col-md-4 strong-weight">{tran.bidder}</div>
                            <Link to={`/jobs/single/${tran.projectid}`}>
                            <div className="col-md-4 strong-weight">{tran.projectid}</div>
                            </Link>
                            <div className="col-md-4 strong-weight">{tran.amount}</div>
                        </span>
                    </li>
                </div>
            )
        })
    }

    renderField(field) {
        const className = `custom-input input-login ${field.meta.touched && field.meta.error ? 'border-red' : ''}`
        return (
            <div className="input-group font-size-13 custom-input-append m-auto">
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

    onSubmit(values) {
        // values.projectid = this.props.singleProject.project._id;
        // this.setState({
        //     toggle: false
        // })
        // this.props.submitBid(values);

        const {resetForm} = this.props;

        console.log(values)

        if(values.add){
            console.log("2")

            // resetForm;
            reset('AddWithdraw')
            this.props.reset()
            console.log(values)
            this.props.addWithdrawMoney(parseInt(values.add))

        }

        if(values.withdraw){
            console.log("1")
            this.props.reset()
            console.log(values)
            this.props.addWithdrawMoney(-parseInt(values.withdraw))
        }


        // reset('AddWithdraw')

    }

    renderData() {

        const data = [
            {title: "Incoming Money", value: inM, color: "#2ead20"},
            {title: "Outgoing Money", value: outM, color: "#d64242"},
            // {title: "Data 3", value: 30, color: "#c63b31"},
            // {title: "Data 4", value: 20, color: "#111111"},
        ]
        return data;
    }

    render() {

        if(this.props.transactions.isLoggingIn == true){
            return(
                <div>

                </div>
            )
        }

        if(this.props.transactions.isLoggedIn == false){
            this.props.history.push("/login")
        }

        console.log(this.props.transactions)

        const styles = {
            tab: {
                backgroundColor: '#4b4b4b',
            },
        };

        var moneyIn = {
            money: 0
        }

        var moneyOut = {
            money: 0
        }

        const {handleSubmit, reset} = this.props;

        return (
            <div>
                <MuiThemeProvider>
                    <TopNavBar history={this.props.history}/>
                </MuiThemeProvider>

                <div className="container text-center mt-5">

                    {/*<div className="card card-right-next transaction">*/}
                    {/*<h5 className="card-header">Featured</h5>*/}
                    {/*<div className="card-body">*/}
                    {/*<h5 className="card-title">Special title treatment</h5>*/}
                    {/*<p className="card-text">With supporting text below as a natural lead-in to additional*/}
                    {/*content.</p>*/}
                    {/*<a href="#" className="btn btn-primary">Go somewhere</a>*/}
                    {/*</div>*/}
                    {/*</div>*/}


                    <div className="row">
                        <div className="col-lg-7">

                            <div className="card">
                                <h5 className="card-header">Outstanding Balance : ${this.props.transactions.wallet}</h5>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                        <div className="row">

                                            <div className="col-md-5">
                                                <h5>Add Money</h5>
                                                <Field
                                                    label="Email or Username"
                                                    name="add"
                                                    component={this.renderField}
                                                    type="number"
                                                />
                                                <br/>
                                                <button className="btn btn-primary" type="submit">Add</button>
                                            </div>
                                            <span className="col-md-2"></span>
                                            <div className="col-md-5">
                                                <h5>Withdraw Money</h5>
                                                <Field
                                                    name="withdraw"
                                                    type="number"
                                                    component={this.renderField}
                                                />
                                                <br/>
                                                <button className="btn btn-primary" type="submit">Withdraw</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <br/>

                            <MuiThemeProvider>
                                <Tabs
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                >
                                    <Tab label="Incoming Transactions" value="a" style={styles.tab}>
                                        <div>
                                            <ul className="list-group">
                                                <li className="list-group-item background-dark mt-2">
                                                    <span className="row font-size-14">
                                                        <div className="col-md-4 strong-weight">PAYER</div>
                                                        <div
                                                            className="col-md-4 strong-weight">WAS PAID FOR PROJECT</div>
                                                        <div className="col-md-4 strong-weight">AMOUNT</div>
                                                    </span>
                                                </li>
                                                {this.renderIncoming(moneyIn)}
                                                {console.log(moneyIn)}

                                            </ul>

                                        </div>
                                    </Tab>
                                    <Tab label="Outgoing Transactions" value="b" style={styles.tab}>
                                        <div>
                                            <ul className="list-group">
                                                <li className="list-group-item background-dark mt-2">
                                                    <span className="row font-size-14">
                                                       <div className="col-md-4 strong-weight">PAYEE</div>
                                                        <div className="col-md-4 strong-weight">PAID FOR PROJECT</div>
                                                        <div className="col-md-4 strong-weight">AMOUNT</div>
                                                    </span>
                                                </li>
                                                {this.renderOutgoing(moneyOut)}
                                            </ul>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </MuiThemeProvider>
                        </div>


                        {console.log(inM, outM)}

                        <div className="col-lg-4">

                            <h4>
                                Pie chart of incoming and outgoing income.
                            </h4>
                            <ReactSvgPieChart
                                data={this.renderData()}
                                // If you need expand on hover (or touch) effect
                                expandOnHover={true}
                                // If you need custom behavior when sector is hovered (or touched)
                                // onSectorHover={(d, i, e) => {
                                //     if (d) {
                                //         console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e)
                                //     } else {
                                //         console.log("Mouse leave - Index:", i, "Event:", e)
                                //     }
                                // }}
                                expandSize={1}
                                viewBoxSize={100}
                            />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    if(values.add || values.withdraw){
        if(values.add < 0){
            errors.add = 'Value cant be less than 0'
        }

        if(values.withdraw < 0){
            errors.withdraw = 'Value cant be less than 0'
        }
    }
    return errors;
}

function mapStateToProps(state) {
    return {transactions: state.transactions}
}

export default reduxForm({
    validate,
    form: 'AddWithdraw'
})(
    connect(mapStateToProps, {getTransactions, addWithdrawMoney})(TransactionManager)
);