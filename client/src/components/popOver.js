import React from 'react';
import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Person from 'material-ui/svg-icons/social/person';
import Membership from 'material-ui/svg-icons/action/card-membership';
import Settings from 'material-ui/svg-icons/action/settings';
import Refer from 'material-ui/svg-icons/places/business-center';
import Logout from 'material-ui/svg-icons/action/exit-to-app';
import Divider from 'material-ui/Divider';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {loginSubmit} from "../actions";
import {logout} from "../actions";

class PopoverExampleAnimation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    handleClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {

        const callback = () => {
            console.log("Callback Executed")
            this.props.history.push('/login')
        };

        let label = "H";

        console.log(this.props.name)
        if (this.props.name) {
            label = this.props.name.substring(0, 1)
        }


        return (
            <div>
                <RaisedButton
                    backgroundColor="#a4c639"
                    onClick={this.handleClick}
                    label={label}
                    fullWidth={true}
                    labelStyle={{fontSize: '18px'}}
                    style={{fontSize: '16px'}}
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'middle', vertical: 'center'}}
                    targetOrigin={{horizontal: 'middle', vertical: 'center'}}
                    onRequestClose={this.handleRequestClose}
                    animation={PopoverAnimationVertical}
                >
                    <Menu>
                        <div className="side-bar-image">
                            <img src="https://www.buira.org/assets/images/shared/default-profile.png"
                                 alt="..." className="side-bar-inside-image"/>
                        </div>
                        <Divider/>

                        <a href="/profile">
                            <MenuItem primaryText="Profile" leftIcon={<Person/>}/>
                        </a>
                        <MenuItem primaryText="Membership" leftIcon={<Membership/>}/>
                        <MenuItem primaryText="Settings" leftIcon={<Settings/>}/>
                        <MenuItem primaryText="Refer a Client" leftIcon={<Refer/>}/>
                        <MenuItem onClick={() => this.props.logout(callback)} primaryText="Logout" leftIcon={<Logout/>}/>
                    </Menu>
                </Popover>
            </div>
        );
    }
}

export default connect(null, {logout})(PopoverExampleAnimation);