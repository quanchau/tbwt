import { connect } from "react-redux";
import React, {Component} from 'react';
import axios from 'axios';
import {withRouter, Redirect, Link} from "react-router-dom";

import {setCurrentUser, setQuestionList} from "../actions/index";
import List from "./List";
import Form from "./Form";
import LoadingSpinner from './LoadingSpinner';
import QuestionList from './QuestionList';


const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        questions: state.questions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: user => dispatch(setCurrentUser(user)),
        setQuestionList: questions => dispatch(setQuestionList(questions))
    };
}





class ConnectedApp extends Component {
    constructor() {
        super();
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        });
        const user = JSON.parse(localStorage.getItem("user"));
        this.props.setCurrentUser(user);
        axios.get('/question/questionList')
                .then((response)=> {
                    console.log(response);
                    this.props.setQuestionList(response.data.questions);
                    this.setState({
                        loading: false
                    })
                })


    }

    componentWillMount() {
        console.log(localStorage.getItem("user"));
        if (!localStorage.getItem("user")) {
            this.props.history.push('/login');
        }
    }


    handleLogOut =()=> {
        this.props.setCurrentUser({email: undefined});
        localStorage.removeItem("user");
    }

    render() {
            const user = this.props.currentUser;
            return (
                <div className={"App"}>
                    {this.state.loading? <LoadingSpinner/>:
                    <div className="row mt-5">

                        <div className="col-md-3 offset-md-1">
                            User: <span>{user.email}</span>
                            <Link to={'/login'} onClick={this.handleLogOut}>Log out</Link>
                            <Link to={'/post-question'}>Post new question?</Link>
                        </div>


                    <div className={"top-tbwts"}>
                        <h3>Top TBWTs of the week</h3>
                    </div>

                    <QuestionList/>
                    </div>

                    }
                </div>




            )
      //  }
    }
}

const App = connect(mapStateToProps ,mapDispatchToProps)(ConnectedApp);



export default withRouter(App);

{/*<div className="col-md-3 offset-md-1">*/}
    {/*<h2>Articles</h2>*/}
    {/*<List/>*/}
{/*</div>*/}
{/*<div className="col-md-3 offset-md-1">*/}
    {/*<h2>Add a new article</h2>*/}
{/*<Form/>*/}
{/*</div>*/}

