import React from "react";
import Level from "./Level.jsx";
import Star from "./Star";
import {serverDomain} from "../config/server";
import classNames from "classnames";
import {toggleModalLogin, unSavedFilm, updateSaved} from "../actions/app";
import {postUserSaveFilm} from "../actions/api";
import {getLastest, getMostView} from "../actions/dataHomepage";
import {getUserSaveFilm} from "../actions/dataUserpage";
import {withCookies} from "react-cookie";
import {SERVER_ERRORS} from "../constants/serverErrors";
import {connect} from "react-redux";
import {withRouter} from "react-router";

import {Link} from "react-router-dom";
class Film extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnter: false
        }
    }


    onMouseEnterBookmark = () => {
        this.setState({
            isEnter: true
        })
    }

    onLeaveEnterBookmark = () => {
        this.setState({
            isEnter: false
        })
    }
    updateNewDataFromServer = (filmId) => {
        let {cookies, match} = this.props;
        let token = cookies.get("token");
        this.props.updateSaved(filmId);
        // debugger
        // console.log(match)
        if (match.path == "/user") {
            // alert('route')
            this.props.unSavedFilm(filmId)
        }
        // this.props.getLastest(token);
        // this.props.getMostView(token);
        // this.props.getUserSaveFilm(token);
    }
    onClickBookmark = (event) => {
        event.stopPropagation();
        event.preventDefault();

        // console.log(this.props.updateSaved,"Function")
        if (this.props.isLogin) {
            let {cookies, data} = this.props;
            // console.log(this.props.data)
            let sendData = {
                film_id: data.id
            }
            let config = {
                headers: {
                    "Authorization": `Token ${cookies.get("token")}`
                }
            }
            // this.props.updateSaved(1);
            postUserSaveFilm(sendData, config).then((response) => {

                // const {updateSaved} = this.props;
                if (response.data.errors == null) {
                    // alert('Thao tác thành công');
                    // debugger

                    // console.log(updateSaved,'updateFunction')
                    // updateSaved(film_id);
                    // alert(data.id)
                    this.updateNewDataFromServer(data.id);

                    //Thanh cong
                    // this.props.updateHomepageSavedFilm(response.data.data.film_id);

                }
                else {
                    alert(SERVER_ERRORS[response.data.errors[0].errorCode])
                }
            })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            this.props.toggleModalLogin()
        }
    }

    render() {
        let {data} = this.props;
        return (
            <Link to={`/film/${data.slug}`} className="film">
                <div className="film__thumnail">
                    <img src={serverDomain + data.thumbnail} alt="" className="film__image"/>
                    <div className="film__overlay">
                    </div>
                    <div className="film__bookmark">
                        <i onClick={this.onClickBookmark} onMouseEnter={this.onMouseEnterBookmark}
                           onMouseLeave={this.onLeaveEnterBookmark}
                           className={classNames("fa", {

                               "fa-bookmark-o": this.props.isSaved ? !this.props.isSaved : !this.state.isEnter && !data.is_saved,
                               "fa-bookmark": this.props.isSaved ? this.props.isSaved : this.state.isEnter || data.is_saved
                           })}/>
                    </div>
                    <div className="film__episode">
                        {data.episode_count}
                    </div>
                </div>
                <div className="film__score">

                    <Star score={data.average_score}></Star>
                </div>
                <div className="film__eng-name">
                    {data.english_name}
                </div>
                <div className="film__vi-name">
                    {data.vietnamese_name}
                </div>
                <div className="film__level">
                    <Level level={data.difficult_level}/>
                </div>
            </Link>
        )
    }

}

Film.defaultProps = {
    isSaved: false
}

const mapStateToProps = state => {
    return {
        isLogin: state.app.isLogin
    }
}


export default connect(mapStateToProps, {
    toggleModalLogin,
    getLastest,
    getMostView,
    getUserSaveFilm,
    updateSaved,
    unSavedFilm
})(withRouter(withCookies(Film)))