import React from 'react';
import classNames from 'classnames';
import Answer from './Answer';
import PropTypes from 'prop-types';

export default class Quizz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderAnswers = () => {
        return this.props.data.answer_list.map((item,index) => {
            return <Answer isShowResult={this.props.isShowResult} onClickAnswer={this.props.onClickAnswer} selected={this.props.selected} data={item} />
        })
    }

    render() {
        return (
            <div className="quizz">
                <div className="quizz__question">

 <div className="quizz__number">
                            {
                                this.props.number
                            }
                        </div>
                    <div className="quizz__question-content">

                        <span className="quizz__title">

                            {this.props.data.title}
                        </span>
                        {
                            this.props.data.content
                        }
                    </div>

                </div>

                <div className="quizz__answers">
                    {
                        this.renderAnswers()
                    }
                </div>

            </div>
        )
    }
}

Quizz.propTypes = {
    onClickAnswer:PropTypes.func.isRequired,
    data:PropTypes.object.isRequired,
    selected:PropTypes.number.isRequired,
    isShowResult:PropTypes.bool.isRequired
}
//
// Quizz.defaultProps = {
//     data: {
//         "id": 1,
//         "answer_list": [
//             {
//                 "id": 4,
//                 "content": "Chia tay",
//                 "is_correct": false,
//                 "created_at": "2018-01-09T09:13:52.081000Z",
//                 "updated_at": "2018-01-09T09:13:52.082000Z",
//                 "quizz_id": 1
//             },
//             {
//                 "id": 3,
//                 "content": "Tạm biệt",
//                 "is_correct": false,
//                 "created_at": "2018-01-09T09:13:45.154000Z",
//                 "updated_at": "2018-01-09T09:13:45.154000Z",
//                 "quizz_id": 1
//             },
//             {
//                 "id": 2,
//                 "content": "xin chào người đẹp",
//                 "is_correct": false,
//                 "created_at": "2018-01-09T09:13:26.074000Z",
//                 "updated_at": "2018-01-09T09:13:26.074000Z",
//                 "quizz_id": 1
//             },
//             {
//                 "id": 1,
//                 "content": "Xin chào thế giới",
//                 "is_correct": true,
//                 "created_at": "2018-01-09T09:13:09.477000Z",
//                 "updated_at": "2018-01-09T09:13:31.321000Z",
//                 "quizz_id": 1
//             }
//         ],
//         "title": "Hello",
//         "content": "What is Hello World",
//         "created_at": "2018-01-09T09:12:48.527000Z",
//         "updated_at": "2018-01-09T09:12:48.527000Z",
//         "episode_id": 1
//     }
// }