import React from 'react';
import classNames from "classnames";
import PropTypes from 'prop-types';

export default class Answer extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return (
            <div onClick={()=>{
                if (this.props.isShowResult){
                    return
                }
                this.props.onClickAnswer(this.props.data)}} className={classNames("quizz__answer",{
                    "quizz__answer--showed":this.props.isShowResult,
                    "quizz__answer--selected":!this.props.isShowResult && this.props.selected==this.props.data.id,
                "quizz__answer--selected-right":this.props.isShowResult && this.props.selected==this.props.data.id && this.props.data.is_correct,
                "quizz__answer--selected-wrong":this.props.isShowResult && this.props.selected==this.props.data.id && !this.props.data.is_correct,
                "quizz__answer--right":this.props.isShowResult && this.props.selected!=this.props.data.id && this.props.data.is_correct,

                })}>
                {
                    this.props.data.content
                }
            </div>

        )
    }
}

Answer.propTypes = {
    onClickAnswer:PropTypes.func.isRequired,
    data:PropTypes.object.isRequired,
    selected:PropTypes.number.isRequired,
    isShowResult:PropTypes.bool.isRequired
}