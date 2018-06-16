import React, {Component} from 'react';
import {connect} from "react-redux";
import axios from "axios";
import {withRouter} from "react-router-dom";

var querystring = require('querystring');
import {Button} from 'react-bootstrap';
import {addNewQuestion} from '../actions/index';

class ConnectedPostQuestion extends Component {
    constructor() {
        super();
        this.state = {
            questionContent:''
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onKeyDown(event) {
        var code = event.keyCode || event.which;
        if (code == 13) {
            this.handlePostQuestion();
        }
    }

    handlePostQuestion = () => {
        console.log(this.props.currentUser);
        axios.post('/question/post-question',
            querystring.stringify({
                question_content: this.state.questionContent,
                userId: this.props.currentUser.id
            }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                console.log(response);
            if (response.data.message == "DONE") {
                this.props.postQuestion({question_content: this.state.questionContent});
                this.props.history.push('/');
            }

        });

    }

    handleTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
          <div className={"question-page"}>
              <h2>NEW QUESTION?</h2>
              <input
                  type={"text"}
                  id={"question"}
                  name={"questionContent"}
                  value={this.state.questionContent}
                  onKeyPress={this.onKeyDown}
                  onChange={this.handleTextChange}/>
              <Button type="submit" bsStyle="success" bsSize="small" onClick={() => this.handlePostQuestion} className={"posts-button"}> Post new question </Button>

          </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postQuestion: question => dispatch(addNewQuestion(question))
    }
}

const PostQuestion = connect(mapStateToProps, mapDispatchToProps)(ConnectedPostQuestion);

export default withRouter(PostQuestion);