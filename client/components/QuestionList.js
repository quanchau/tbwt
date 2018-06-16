import { connect } from "react-redux";
import React, {Component} from 'react';

class ConnectedQuestionList extends Component {
    constructor() {
        super();
    }

    render() {

        const questions = this.props.questions;
        return (
            <div className={"question-list"}>
            {
                questions.map((question, index)=>
                <div className={"question"} key={"index"}>
                    {question.question_content}
                </div>
                )
            }
            </div>

        )
    }
}


const mapStateToProps = state => {
    return {
        questions: state.questions
    }
}

const QuestionList = connect(mapStateToProps)(ConnectedQuestionList);

export default QuestionList;