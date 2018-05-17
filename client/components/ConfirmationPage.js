import React, {Component} from 'react';
import axios from 'axios';

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
            <h2>{this.state.confirmMessage}</h2>
        )
    }

}

export default ConfirmationPage;

