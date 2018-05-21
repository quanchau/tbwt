import React, {Component} from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import {NavLink, withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {setCurrentUser} from "../actions/index";
import LoadingSpinner from "./LoadingSpinner";


var querystring = require('querystring');

class ConnectedLoginPage extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password:"",
            needConfirmation: false,
            loading: false,
        }
        this.handleTextChange= this.handleTextChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.onClickResend = this.onClickResend.bind(this);
        this.handleResend = this.handleResend.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);


    }




    handleTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onClick() {
        this.handleLogIn(this);
    }

    handleLogIn(e) {
        axios.post('/login',
            querystring.stringify({
                email: e.state.email,
                password: e.state.password,

            }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function(response) {
            if (response.data == "DONE") {
                console.log("ABC");
                const email = e.state.email;
                const password = e.state.password;
                localStorage.setItem("user", JSON.stringify({email, password}));
                e.props.history.push('/');


            }

            else if (response.data == 'VERIFY') {
                e.setState({
                    needConfirmation: true,
                    messageFromServer: '',

                })
            }

            else {
                e.setState({
                    messageFromServer: response.data,
                    needConfirmation: false,

                });
            }
        });
    }



    onClickResend() {
        this.handleResend(this);
    }


    handleResend(e) {
        this.setState({loading: true,  needConfirmation: false,});
        axios.post('/resend-confirmation',
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



    render() {
        if (localStorage.getItem("user")) {
            return (<Redirect to="/" push/>);
        }



            const confirmationMessage = this.state.needConfirmation ? (
                <div>Email address not confirmed. Click <button onClick={this.onClickResend}><b>here</b></button> to
                    receive a new confirmation link</div>
            ) : <span/>;

            const loadingDisplay = this.state.loading? <LoadingSpinner />: <span/>;

            const errorMessage = this.state.messageFromServer != '' ?
                (<div>{this.state.messageFromServer}</div>) : <span/>;


            return (
                <div>
                    {confirmationMessage}
                    {loadingDisplay}
                    {errorMessage}
                    <div>
                        <label htmlFor={"email"}>Email:</label>
                        <input
                            type={"email"}
                            id={"email"}
                            name={"email"}
                            value={this.state.email}
                            onKeyPress={this.onKeyDown}
                            onChange={this.handleTextChange}/>
                    </div>
                    <div>
                        <label htmlFor={"password"}>Password:</label>
                        <input
                            type={"password"}
                            id={"password"}
                            name={"password"}
                            value={this.state.password}
                            onChange={this.handleTextChange}
                            onKeyPress={this.onKeyDown}/>
                    </div>

                    <Button type="submit" bsStyle="success" bsSize="small" onClick={this.onClick}> Log in </Button>
                    <div>

                        <NavLink to={"/registration"}> Create a new account </NavLink>
                    </div>
                    <div>
                        <NavLink to={"/reset-password"}> Forgot your password? </NavLink>
                    </div>
                </div>
            )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: user => dispatch(setCurrentUser(user))
    }
}

const LoginPage = connect(null, mapDispatchToProps)(ConnectedLoginPage);


export default withRouter(LoginPage);

// export default withRouter(LoginPage);
