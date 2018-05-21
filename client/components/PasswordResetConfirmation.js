import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import axios from "axios/index";
import LoadingSpinner from './LoadingSpinner';
import {NavLink} from 'react-router-dom';

var querystring = require('querystring');


class PasswordResetConfirmation extends Component {
    constructor() {
        super();
        this.state = {
            loading:false,
            password:'',
            password2:'',
            messageFromServer:'',
            errorPassword:false,
            errorPassword2:false,
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    handleTextChange(e) {
        this.setState({
            [e.target.name]:e.target.value,
        })
    }

    onClick() {
        if (this.state.password.length < 6) {
            this.setState({
                errorPassword: true,
                errorPassword2: false,
            });
        } else if (this.state.password2 != this.state.password) {
            this.setState({
                errorPassword2: true,
                errorPassword: false,
            })
        } else {
            this.setState({
                errorPassword: false,
                errorPassword2: false,
            })

            this.handleResetPassword(this);
        }
    }

    handleResetPassword(e) {
        this.setState({loading: true});
        axios.post('/reset-password-confirmation',
            querystring.stringify({
                password: e.state.password,
                token: e.props.match.params.token,

            }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function(response) {
                e.setState({
                    loading: false,
                    messageFromServer: response.data,

                });
        });
    }

    onKeyDown(event) {
        var code = event.keyCode || event.which;
        if (code == 13) {
            this.onClick();
        }
    }

    render() {

        if (this.state.loading) return <LoadingSpinner />

        if (this.state.messageFromServer != '') {
            return (
                <div>
                    {this.state.messageFromServer}
                    <NavLink to={"/login"}>Back to login page</NavLink>
                </div>)
        }

        const passwordError =
            this.state.errorPassword?
                (<div> Password must have 6 or more characters </div>):
                    this.state.errorPassword2?
                        (<div> You must type in the same password for both fields </div>):
                        (<span/>);
        return (
            <div>
                {passwordError}
                <div>
                    <label htmlFor={"password"}>New password: </label>

                    <input type={"password"}
                           id={"password"}
                           name={"password"}
                           value={this.state.password}
                           onChange={this.handleTextChange}
                    />
                </div>
                <div>

                    <label htmlFor={"password2"}>Re-type new password: </label>

                    <input type={"password"}
                           id={"password2"}
                           name={"password2"}
                           value={this.state.password2}
                           onChange={this.handleTextChange}
                           onKeyDown={this.onKeyDown}
                    />
                </div>

                <Button type={"submit"} onClick={this.onClick}> Reset password </Button>

            </div>
        )

    }
}

export default PasswordResetConfirmation;
