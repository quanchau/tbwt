import React, {Component} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

var querystring = require('querystring');

class ConfirmationPage extends Component {
    constructor() {
        super();
        this.state = {
            confirmMessage: '',
        }

        this.setToken = this.setToken.bind(this);
    }

    setToken(e) {
        axios.post('/confirmation',
            querystring.stringify({
                token: e.props.match.params.token,
            }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function (response) {
            e.setState({
                confirmMessage: response.data
            })
        });

    }

    componentWillMount() {
        this.setToken(this);
    }



    render() {
        return (
            <div>
                <h2>{this.state.confirmMessage}</h2>
                <NavLink to={"/login"}>Back to log in</NavLink>
            </div>
        )
    }

}

export default ConfirmationPage;

