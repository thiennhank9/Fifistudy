import React from "react";
import StarRatingContainer from "./StarRatingContainer";
import Level from "./Level.jsx";
import classNames from "classnames";
import {serverDomain} from "../config/server";
import {withRouter} from "react-router";
import {postUserSaveFilm} from "../actions/api";
import {updateFilm} from "../actions/dataIntropage";
import {connect} from "react-redux";
import {withCookies} from "react-cookie";
import {toggleModalLogin} from "../actions/app";
class Banner extends React.Component {
    constructor(props) {

        super(props);
        let haveEpisode = false;
        let data = this.props.data;
        if (data.episodes[data.episodes.length - 1]) {
            if (data.episodes[data.episodes.length - 1].number) {
                haveEpisode = true;
            }
        }
        this.state = {
            isHiddenBtnPlay: window.innerWidth > 767,
            haveEpisode

        };
    }


    onClickBanner = (evt) => {
        let data = this.props.data;
        if (this.state.haveEpisode) {
            this.props.history.push(`/film/${data.slug}/${data.episodes[data.episodes.length - 1].number}`);
        }

        else {
            event.preventDefault();
        }
    }

    onMouseEnterBanner = () => {
        if (window.innerWidth <= 767) {
            this.setState({
                isHiddenBtnPlay: false
            })
            return;
        }
        this.setState({
            isHiddenBtnPlay: false
        })
    }

    onMouseLeaveBanner = () => {
        if (window.innerWidth <= 767) {
            this.setState({
                isHiddenBtnPlay: false
            })
            return;
        }
        this.setState({
            isHiddenBtnPlay: true
        })
    }

    updateData = () => {
        let {cookies} = this.props;
        let token = cookies.get("token");
        // alert(token)

        // Token cho nay
        this.props.updateFilm(this.props.data.slug, token);
    }

    onClickBookMark = () => {
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
            postUserSaveFilm(sendData, config).then((response) => {
                if (response.data.errors == null) {
                    // this.updateNewDataFromServer(this.props.data.id);
                    this.updateData()
                    // alert('Thanh cong');
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
        let data = this.props.data;
        return (
            <div
                // to={`/${data.slug}/${data.episodes[data.episodes.length - 1].id}`}
                className="banner">

                <div className="container">
                    <div
                        className="banner__wrap" onMouseEnter={this.onMouseEnterBanner}
                        onMouseLeave={this.onMouseLeaveBanner}>
                        <img src={`${serverDomain + data.thumbnail}`} alt="" className="banner__image"/>
                        <div className="banner__overlay">
                        </div>
                        <div className="banner__info">
                            <div className="banner__eng-name">
                                <i className={classNames("fa banner__bookmark", {
                                    "fa-bookmark": this.props.data.is_saved,
                                    "fa-bookmark-o": !this.props.data.is_saved
                                })} onClick={this.onClickBookMark}/>
                                &nbsp;
                                {
                                    data.english_name
                                }
                            </div>
                            <div className="banner__vi-name">
                                {
                                    data.vietnamese_name
                                }
                            </div>
                            <div className="banner__detail">

                                <div className="banner__pieces">
                                    <div className="banner__level">
                                        <Level level={data.difficult_level}></Level>
                                    </div>
                                    <div className="banner__title">Số tập: <span
                                        className="banner__content">{data.episode_count}/{data.episode_number}
                                        tập</span></div>
                                    <div className="banner__title">Thời lượng: <span
                                        className="banner__content">{data.duration} phút/tập</span>
                                    </div>
                                    <div className="banner__star">
                                        <StarRatingContainer data={this.props.data}/>
                                        {/*<Star score={data.average_score}></Star>*/}
                                    </div>
                                </div>
                                <div className="banner__wrap-des">
                                    <div className="banner__description">
                                        {data.description}
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/*<div*/}
                        {/*className={classNames("banner__overlay-btn", {"banner__overlay-btn--open": !this.state.isHiddenBtnPlay && this.state.haveEpisode})}></div>*/}
                        {
                            this.state.haveEpisode ? <div style={{cursor: this.state.haveEpisode ? "pointer" : "auto"}}
                                                          onClick={this.onClickBanner} className="playBtn">
                                <svg xmlns="http://www.w3.org/2000/svg" id="play"
                                     className={classNames({"goDown": this.state.isHiddenBtnPlay})} width="119.91"
                                     height="119.91">
                                    <path fill="#E74C3C"
                                          d="M58.8 10.8c-27.77 0-50.3 22.5-50.3 50.3 0 27.78 22.53 50.3 50.3 50.3 27.8 0 50.32-22.52 50.32-50.3 0-27.8-22.53-50.3-50.3-50.3zm0 97.97c-26.32 0-47.66-21.34-47.66-47.67 0-26.34 21.34-47.68 47.67-47.68 26.37 0 47.7 21.34 47.7 47.67 0 26.3-21.33 47.64-47.66 47.64z"/>
                                    <path fill="#E74C3C"
                                          d="M58.8 21.12c-22.07 0-39.97 17.9-39.97 39.98s17.9 39.98 39.98 39.98c22.1 0 40-17.9 40-39.98s-17.9-39.98-40-39.98zm3.52 50.7L43.77 82.47l.04-21.37.07-21.37 18.5 10.72 18.5 10.72L62.3 71.82z"/>
                                </svg>
                            </div> : null
                        }
                    </div>

                    <div className="divider"></div>
                </div>

            </div>
        )
    }
}
//
//
const mapStateToProps = state => {
    return {
        isLogin: state.app.isLogin
    }
}
//
//
export default connect(mapStateToProps, {toggleModalLogin, updateFilm})(withRouter(withCookies(Banner)))