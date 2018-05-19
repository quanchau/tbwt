import List from "./List";
import Form from "./Form";
import { connect } from "react-redux";
import {Component} from 'react';
import {setCurrentUser} from "../actions/index";
import {withRouter, Redirect, Link} from "react-router-dom";

var React = require('react');

const mapStateToProps = state => {
    return {currentUser: state.currentUser}
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: user => dispatch(setCurrentUser(user))
    };
}



class ConnectedApp extends Component {
    constructor() {
        super();
        if (localStorage.getItem("user")) {
            const user = localStorage.getItem("user");

            this.state = {
                currentUser: JSON.parse(localStorage.getItem("user"))
            };
        } else {
            this.state = {
                currentUser: undefined,
            };
        }

        this.handleLogOut = this.handleLogOut.bind(this);

    }

    componentDidMount() {
        this.props.setCurrentUser(this.state.currentUser);
    }






        // componentDidMount() {
        //     fetch('/users')
        //         .then(res => res.json())
        //         .then(users => {
        //             this.setState({users: users});
        //             console.log(users);
        //         })
        // },

    handleLogOut() {
        this.props.setCurrentUser(undefined);
        localStorage.removeItem("user");
    }

    render() {

        if (this.state.currentUser == undefined) {
            return (<Redirect to="/login" />);
        } else {
            const user = this.state.currentUser;
            console.log(user);
            return (

                <div className="row mt-5">
                    <div className="col-md-3 offset-md-1">
                        <h2>Articles</h2>
                        <List/>
                    </div>
                    <div className="col-md-3 offset-md-1">
                        <h2>Add a new article</h2>
                        <Form/>
                    </div>
                    <div className="col-md-3 offset-md-1">
                        User: <span>{user.email}</span>
                        <Link to={'/login'} onClick={this.handleLogOut}>Log out</Link>
                    </div>

                </div>


            )
        }
    }
}

const App = connect(null,mapDispatchToProps)(ConnectedApp);



export default withRouter(App);

