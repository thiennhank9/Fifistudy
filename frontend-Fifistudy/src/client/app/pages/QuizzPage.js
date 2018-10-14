import React from 'react';
import Quizz from '../components/Quizz';
import FadeTransition from '../components/FadeTransition'
import { Line, Circle } from 'rc-progress';
import Scrollbars from '../components/ScrollBar';
import update from 'react-addons-update';
import {serverDomain} from "../config/server";

export default class QuizzPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentSelected:this.props.data.quizz_list.map(item=>{
                return {
                    id:item.id,
                    selected:null
                }
            }),
            isShowResult:false
        };
    }
    onClickAnswer = (item) =>{
        let foundItem = this.state.currentSelected.findIndex(o=>o.id==item.quizz_id);
        if (foundItem<0){
            return null
        }
        this.setState(update(this.state,{currentSelected:{$splice:[[foundItem,1,{
            id:item.quizz_id,
                    selected:item.id
                }]]}}));
    }

    getSelectedValue = (quizzId) =>{
        let foundObj = this.state.currentSelected.find(o=>o.id==quizzId);
        if (!foundObj){
            return null
        }
        return foundObj.selected
    }

    onClickResult = () =>{
        this.setState({
            isShowResult :true
        })
    }


    renderQuizzes = () =>{

        return this.props.data.quizz_list.map((item,index)=>{
            return (
            <div className="quizz-page__wrap-item">
                <Quizz isShowResult={this.state.isShowResult} onClickAnswer={this.onClickAnswer} selected={this.getSelectedValue(item.id)} data={item} number={index+1}/>
            </div>
        )})
    }
    calcPoint = () =>{
        let totalRight=0;
        this.props.data.quizz_list.map(item=>{
            let rightAnswer = item.answer_list.find(o=>o.is_correct==true);
            if (rightAnswer){
                let selectedAnswer = this.state.currentSelected.find(o=>o.id==item.id);
                if (selectedAnswer){
                    if (selectedAnswer.selected==rightAnswer.id){
                        totalRight+=1;
                    }
                }
            }
        });
        return {
            totalRight,
            totalQuizz:this.props.data.quizz_list.length,
        }
    }
    renderProgress = () =>{
        if (this.state.isShowResult){
            const result = this.calcPoint();
            const percent = Math.floor((result.totalRight/result.totalQuizz)*100);
            let color='#D9534F'
            if (percent>=50){
                color='#5CB85C';
            }
            return(
                <div className="quizz-page__percent">
                    <div className="quizz-page__noti">
                        Bạn đã trả lời đúng: <span style={{color:color}}>{result.totalRight}/{result.totalQuizz} câu ({percent}%) </span>
                    </div>
                    <Line percent={Math.floor((result.totalRight/result.totalQuizz)*100)} trailColor='#ffffff' strokeWidth="2" trailWidth={2} strokeColor={color} />
                </div>)

        }
    }
    render(){

        return (
            <FadeTransition>
                <div className="quizz-page">
                    <div className="quizz-page__overlay" style={{backgroundImage: `url(${serverDomain+this.props.data.film_detail.thumbnail}`}}>

                    </div>


                    <Scrollbars>
                        <div className="container">
                                <div className="quizz-page__title">
                                    TEST: {this.props.data.film_detail.english_name}
                                </div>
                                <div className="quizz-page__sub-title">
                                    Episode: {this.props.data.episode_detail.number}
                                </div>
                            <div className="quizz-page__wrap">
                                {
                                    this.renderQuizzes()
                                }
                                <div className="quizz-page__result">
                                    <div onClick = {this.onClickResult} className="section-user-info__btn">
                                        Xem kết quả
                                    </div>
                                    {this.renderProgress()}
                                </div>
                            </div>

                        </div>


                    </Scrollbars>
                </div>
            </FadeTransition>
        )
    }
}
//
// QuizzPage.defaultProps = {
//     "data": {
//         "film_detail": {
//             "id": 1,
//             "english_name": "How I met your mother - Season 1",
//             "vietnamese_name": "Khi bố gặp mẹ - Mùa 1",
//             "slug": "how_i_met_your_mother",
//             "difficult_level": 1,
//             "description": "Xem phim how i met your mother là câu chuyện được nhân vật chính - Ted Mosby kể lại cho 2 đứa con của mình về câu chuyện tình của bố mẹ chúng. Khi anh chàng 27 tuổi, Ted cảm thấy muốn kết hôn sau khi cậu bạn cùng phòng, Marshall đính hôn với cô bạn thân từ thời đại học của anh, Lily sau 9 năm hẹn hò. Với sự giúp đỡ của 'chuyên gia tán gái' Barney, Ted đã bước vào cuộc tìm kiếm “một nửa” của mình. Bộ phim vô cùng hài hước và là nguồn tài liệu để học nói tiếng anh cực kì hiệu quả.",
//             "thumbnail": "/media/film/thumbnail/cai-bua.jpg",
//             "thumbnail240": "/media/film/thumbnail240/cai-bua.jpg",
//             "average_score": 0,
//             "review_number": 0,
//             "duration": "25",
//             "episode_number": 0,
//             "episode_count": 1,
//             "save_number": 0,
//             "view_number": 0,
//             "created_at": "2018-01-09T09:10:53.997000Z",
//             "updated_at": "2018-01-09T09:12:13.492000Z"
//         },
//         "episode_detail": {
//             "id": 1,
//             "number": "1",
//             "name": null,
//             "video": null,
//             "link_video": "https://s3-ap-southeast-1.amazonaws.com/fifistudy/film/how+i+met+your+mother/1.mp4",
//             "sub": "/media/episode/sub/1_QSLlBcZ.vtt",
//             "eng_sub": null,
//             "vie_sub": null,
//             "created_at": "2018-01-09T09:12:13.483000Z",
//             "updated_at": "2018-01-09T09:12:13.483000Z",
//             "film_id": 1
//         },
//         "quizz_list": [
//             {
//                 "id": 1,
//                 "answer_list": [
//                     {
//                         "id": 4,
//                         "content": "Chia tay",
//                         "is_correct": false,
//                         "created_at": "2018-01-09T09:13:52.081000Z",
//                         "updated_at": "2018-01-09T09:13:52.082000Z",
//                         "quizz_id": 1
//                     },
//                     {
//                         "id": 3,
//                         "content": "Tạm biệt",
//                         "is_correct": false,
//                         "created_at": "2018-01-09T09:13:45.154000Z",
//                         "updated_at": "2018-01-09T09:13:45.154000Z",
//                         "quizz_id": 1
//                     },
//                     {
//                         "id": 2,
//                         "content": "xin chào người đẹp",
//                         "is_correct": false,
//                         "created_at": "2018-01-09T09:13:26.074000Z",
//                         "updated_at": "2018-01-09T09:13:26.074000Z",
//                         "quizz_id": 1
//                     },
//                     {
//                         "id": 1,
//                         "content": "Xin chào thế giới",
//                         "is_correct": true,
//                         "created_at": "2018-01-09T09:13:09.477000Z",
//                         "updated_at": "2018-01-09T09:13:31.321000Z",
//                         "quizz_id": 1
//                     }
//                 ],
//                 "title": "Hello",
//                 "content": "What is Hello World",
//                 "created_at": "2018-01-09T09:12:48.527000Z",
//                 "updated_at": "2018-01-09T09:12:48.527000Z",
//                 "episode_id": 1
//             },
//             {
//                 "id": 2,
//                 "answer_list": [
//                     {
//                         "id": 8,
//                         "content": "Chia tay",
//                         "is_correct": false,
//                         "created_at": "2018-01-09T09:13:52.081000Z",
//                         "updated_at": "2018-01-09T09:13:52.082000Z",
//                         "quizz_id":2
//                     },
//                     {
//                         "id": 7,
//                         "content": "Tạm biệt",
//                         "is_correct": false,
//                         "created_at": "2018-01-09T09:13:45.154000Z",
//                         "updated_at": "2018-01-09T09:13:45.154000Z",
//                         "quizz_id": 2
//                     },
//                     {
//                         "id": 6,
//                         "content": "xin chào người đẹp",
//                         "is_correct": false,
//                         "created_at": "2018-01-09T09:13:26.074000Z",
//                         "updated_at": "2018-01-09T09:13:26.074000Z",
//                         "quizz_id": 2
//                     },
//                     {
//                         "id": 5,
//                         "content": "Xin chào thế giới",
//                         "is_correct": true,
//                         "created_at": "2018-01-09T09:13:09.477000Z",
//                         "updated_at": "2018-01-09T09:13:31.321000Z",
//                         "quizz_id": 2
//                     }
//                 ],
//                 "title": "Hello 2",
//                 "content": "What is Hello World 2",
//                 "created_at": "2018-01-09T09:12:48.527000Z",
//                 "updated_at": "2018-01-09T09:12:48.527000Z",
//                 "episode_id": 1
//             }
//         ]
//     }
// }