import React from "react";
import {serverDomain} from "../config/server";
import classNames from "classnames";
import {postLikeComment} from "../actions/api";
import {getComment} from "../actions/dataIntropage";
import {withCookies} from "react-cookie";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {toggleModalLogin} from "../actions/app";
import TimeAgo from "react-timeago";
import viStrings from "react-timeago/lib/language-strings/vi";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
const formatter = buildFormatter(viStrings)


class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onClickLike = () => {
        if (this.props.isLogin) {
            let {cookies} = this.props;
            let token = cookies.get("token");
            let data = {
                comment_id: this.props.data.id
            }
            postLikeComment(data, token).then(response => {
                if (response.data.errors == null) {
                    // alert('Thao tác thành công');
                    // Cap nhật lại commnet
                    this.props.getComment(this.props.match.params.slug, token)
                }
                else {
                    alert('Like thất bại')
                }
            })
        }
        else {
            this.props.toggleModalLogin();
        }
    }

    render() {
        let {data} = this.props;
        return (
            <div className="comment">
                <div className="comment__wrap-image" style={{backgroundImage: `url(${serverDomain + data.avatar})`}}>
                    {/*<img className="comment__image" src={serverDomain + data.avatar} alt="Avatar"/>*/}

                </div>
                <div className="comment__info">
                    <div className="comment__name">
                        {(data.first_name && data.last_name) ? `${data.first_name || ""} ${data.last_name || ""}` : data.username}
                        <span className="comment__time">
                        <i className="fa fa-circle fa-lg comment__dot"></i>
                            {/*<span>  3 ngày trước</span>*/}
                            &nbsp;
                            <TimeAgo date={data.created_at} formatter={formatter}/>
                    </span>
                    </div>
                    <div className="comment__content">
                        {data.content}
                    </div>

                </div>
                <div className={classNames("comment__section-like")}>
                    <div onClick={this.onClickLike}
                         className={classNames("comment__like", {"comment__like--liked": data.is_liked})}>
                        <i className="fa fa-thumbs-up"></i>
                    </div>
                    <div className="comment__like-number">
                        {data.like_number}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.app.isLogin
    }
}


export default connect(mapStateToProps, {getComment, toggleModalLogin})(withRouter(withCookies(Comment)))