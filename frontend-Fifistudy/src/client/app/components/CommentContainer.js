import React from "react";
import _ from "lodash";
import {connect} from "react-redux";
import {serverDomain} from "../config/server";
import {withRouter} from "react-router";

import {postComment} from "../actions/api";

import validator from "validator";
import {getComment} from "../actions/dataIntropage";

import {toggleModalLogin} from "../actions/app";

import {withCookies} from "react-cookie";
import Comments from "./Comments";

class CommentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ""
        };
    }

    onTextareaChange = (evt) => {
        this.setState({
            comment: evt.target.value
        })
    }

    onTextareaKeyPress = (evt) => {
        if (evt.charCode == 13) {
            evt.preventDefault();
            if (!validator.isEmpty(this.state.comment)) {
                let data = {
                    content: this.state.comment,
                    film_id: this.props.data.id
                }
                let {cookies} = this.props;
                let token = cookies.get("token")
                postComment(data, token).then(res => {
                    if (res.data.errors === null) {
                        // alert('Comment thanh cong');
                        this.setState({
                            comment: ""
                        })
                        this.props.getComment(this.props.match.params.slug, token)
                        //Cap nhat lai comment o day

                    }
                    else {
                        alert('Bình luận thất bại')
                    }
                });

            }
            else {
                alert('Vui lòng nhập nội dung')
            }

        }

    }

    onTextareaFocus = (e) => {

        if (this.props.isLogin) {
            return
        }
        this.props.toggleModalLogin();
    }

    renderContent = () => {

        let {comment} = this.props;
        if (comment.isLoading) {
            return (
                <div className="list-actor__no-data"> Đang tải ... </div>
            )
        }
        else {
            if (comment.data.errors == null) {
                if (comment.data.data.length > 0) {
                    return (
                        <Comments data={comment.data.data}/>
                    )
                }
                else {
                    return (
                        <div className="list-actor__no-data">Chưa có bình luận nào</div>
                    )
                }
            }
        }
    };


    render() {
        // console.log(this.props);
        let userInfo = null;
        if (_.has(this.props.userInfo, "data.errors")) {
            if (this.props.userInfo.data.errors == null) {
                // debugger
                userInfo = this.props.userInfo.data.data
            }
        }
        return (
            <div className="comments">
                <div className="comments__section-comment">
                    <div className="comments__wrap-image"
                         style={{backgroundImage: `url(${userInfo ? serverDomain + userInfo.avatar : "http://placehold.it/100x100"})`}}>
                        {/*<img src={} alt="Avatar" className="comments__image"/>*/}
                    </div>
                    <div className="comments__comment">
                        <div className="comments__name">
                            {
                                userInfo ? ((userInfo.first_name && userInfo.last_name) ? `${userInfo.first_name || ""} ${userInfo.last_name}` : userInfo.username)
                                    : "Nhập bình luận tại đây"
                            }
                        </div>
                        <textarea onClick={this.onTextareaFocus} onKeyPress={this.onTextareaKeyPress}
                                  onChange={this.onTextareaChange}
                                  placeholder={this.props.isLogin ? "Nhập bình luận của bạn" : "Vui lòng đăng nhập để bình luận"}
                                  type="text" className="comments__input" value={this.state.comment}/>
                    </div>
                </div>
                {
                    this.renderContent()
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        comment: state.dataIntropage.comment,
        isLogin: state.app.isLogin,
        userInfo: state.app.userInfo,
    }
}

export default connect(mapStateToProps, {toggleModalLogin, getComment})(withRouter(withCookies(CommentContainer)))
