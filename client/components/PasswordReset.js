import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import {Button} from 'react-bootstrap';
import axios from 'axios';

var querystring = require('querystring');


class PasswordReset extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            email: '',
            messageFromServer:'',
            errorEmail: false,
        }

        this.handleTextChange = this.handleTextChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onClick = this.onClick.bind(this);

    }

    handleTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })

    }

    handlePasswordReset(e) {
        this.setState({loading: true});
        axios.post('/reset-password',
            querystring.stringify({
                email: e.state.email,
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

    onClick() {
        const rege = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!this.state.email.match(rege)) {
            this.setState({
                errorEmail: true,
            });
        } else {
            this.setState({
                errorEmail: false,
            })
            this.handlePasswordReset(this);
        }
    }


    render() {
        if (this.state.messageFromServer != '') {
            return (
                <div>
                    {this.state.messageFromServer}
                    <NavLink to={"/login"}>Back to login page</NavLink>
                </div>
            );
        }

        if (this.state.loading) return <LoadingSpinner />
        else {
            const errorEmail = this.state.errorEmail ? (
                <div>This email is invalid</div>
            ) : <span/>

            return (
                <div>

                    {errorEmail}
                    <div>
                    <label htmlFor={"email"}> Email address: </label>
                    <input type={"email"}
                           id={"email"}
                           name={"email"}
                           value={this.state.email}
                           onChange={this.handleTextChange}
                           onKeyPress={this.onKeyDown}
                    />
                    </div>

                    <Button
                        type={"submit"} bsStyle="success" bsSize="small" onClick={this.onClick}>
                        Reset Password
                    </Button>
                </div>
            )
        }

    }


}

export default PasswordReset;