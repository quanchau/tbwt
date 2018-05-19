import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

var querystring = require('querystring');

class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            errorEmail: false,
            messageFromServer: '',
            password: '',
            password2: '',
            errorPassword: false,
            errorPassword2: false,
            loading: false,
        }
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.insertNewUser = this.insertNewUser.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);

    }


    onClick() {

        const rege = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!this.state.email.match(rege)) {
            this.setState({
                errorPassword: false,
                errorEmail: true,
                errorPassword2: false
            });
        } else if (this.state.password.length < 6) {
            this.setState({
                errorEmail: false,
                errorPassword: true,
                errorPassword2: false
            });
        } else if (this.state.password != this.state.password2) {
            this.setState({
                errorEmail: false,
                errorPassword: false,
                errorPassword2: true,
            })
        }

        else {

            this.insertNewUser(this);
        }
    }

    insertNewUser(e) {
        this.setState({loading: true});
        axios.post('/insert',
            querystring.stringify({
                email: e.state.email,
                password: e.state.password,

            }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function (response) {
            console.log(response);
            if (response.data == "Email Error") {
                console.log("ABC");
                e.setState({
                    errorEmail: true,
                    errorPassword: false,
                    errorPassword2: false,
                    loading: false,
                })
            } else {
                e.setState({
                    messageFromServer: response.data,
                    errorEmail: false,
                    errorPassword: false,
                    errorPassword2: false,
                    loading: false,
                });
            }
        });

    }

    handleTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onKeyDown(event) {
        var code = event.keyCode || event.which;
        if (code == 13) {
            this.onClick();
        }
    }

    render() {


        if (this.state.messageFromServer != '') {
            {
                this.state.loading ? (<LoadingSpinner/>) : (<div>
                    <h3>{this.state.messageFromServer}</h3>
                    <div><Link to={'/login'}>Back to log in page</Link></div>
                    );

                </div>)
            }


        }


        else {

            const errorEmail = this.state.errorEmail ? (
                <div>This email is invalid or has been used by another user</div>
            ) : <span/>

            const errorPassword = this.state.errorPassword ? (
                <div> Password must have 6 or more characters</div>
            ) : <span/>

            const errorPassword2 = this.state.errorPassword2 ? (
                <div> Your password must match with the previous one</div>
            ) : <span/>


            {
                this.state.loading ? (<LoadingSpinner/>) : (
                    <div>
                        <br/>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleTextChange}
                                onKeyPress={this.onKeyDown}
                                required></input>
                            {errorEmail}
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input type="password"
                                   id="password"
                                   name="password"
                                   value={this.state.password}
                                   onChange={this.handleTextChange}
                                   onKeyPress={this.onKeyDown}
                                   required></input>
                            {errorPassword}
                        </div>
                        <div>
                            <label htmlFor="password2">Re-type your password:</label>
                            <input
                                type="password"
                                id="password2"
                                name="password2"
                                value={this.state.password2}
                                onChange={this.handleTextChange}
                                onKeyPress={this.onKeyDown}
                                required></input>
                            {errorPassword2}
                        </div>
                        <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Sign up</Button>

                    </div>
                );

            }
        }

    }
}

export default Registration;
