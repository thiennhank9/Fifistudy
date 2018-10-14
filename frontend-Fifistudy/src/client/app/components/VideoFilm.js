import React from "react";
import axios from "axios";
import $ from "jquery";
import ModalSaveVocabulary from "./ModalSaveVocabulary";
import Scrollbars from '../components/ScrollBar';
import classNames from "classnames";
import {toggleModalLogin} from "../actions/app";
import {connect} from "react-redux";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router";
import {serverDomain} from "../config/server";


class VideoFilm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sub: null,
            currentLine: "",
            isPractice: false,
            valueTimeBack: 5,
            valueSpeed: 1.0,
            currentClickSave: null
        };
    }

    onClickOutside = () => {
        this.setState({
            currentClickSave: null
        })
    }

    timeString2ms(a, b) {// time(HH:MM:SS.mss) // optimized
        return a = a.split('.'), // optimized
            b = a[1] * 1 || 0, // optimized
            a = a[0].split(':'),
        b + (a[2] ? a[0] * 3600 + a[1] * 60 + a[2] * 1 : a[1] ? a[0] * 60 + a[1] * 1 : a[0] * 1) * 1e3 // optimized
    }

    onClickSub = (item) => {
        this.player.seek(item.start);
    }

    onClickSave = (evt, item) => {
        if (this.props.isLogin) {
            evt.preventDefault();
            evt.stopPropagation();
            // debugger
            this.setState({
                currentClickSave: {...item, ...{episode_id: this.props.data.id}}
            })
        }
        else {
            this.props.toggleModalLogin()
        }
    }



    renderSub = () => {
        if (this.state.sub) {
            return this.state.sub.map(item => {
                return (
                    <div onClick={this.onClickSub.bind(this, item)} ref={item.number} key={item.number}
                         className={classNames("video-film__sub-item", {"video-film__sub-item--current": this.state.currentLine.number === item.number})}>
                        <div className="video-film__subline">
                            <div className="video-film__eng">
                                {
                                    item.sub[0].replace(/<\/?[^>]+(>|$)/g, "")
                                }
                            </div>
                            <div className="video-film__vi">
                                {
                                    item.sub[1].replace(/<\/?[^>]+(>|$)/g, "")
                                }
                            </div>
                        </div>

                        <div className="video-film__bookmark" onClick={(evt) => this.onClickSave(evt, item)}>
                            <i className="fa fa-bookmark-o"></i>
                        </div>
                    </div>
                )
            })
        }
    }

    initPlayer = (data) => {
        this.setState({
            currentLine: ""
        })
        this.refs.scroll.refs.scrollBar.scrollTop();
        this.player = window.jwplayer('player').setup({
            // file: '../static/media/video.mp4',
            // file: 'http://media.studyphim.vn/VIPN5/Extra/01_Extra_English_-_Hectors_arrival.mp4',
            file: `${data.link_video}`,
            // file: `http://localhost:8000/media/episode/video/How_i_met_your_mother1_01.mp4`,

            tracks: [{
                file: `${serverDomain + data.sub}`,
                label: "Eng-Vie",
                kind: "captions",
                "default": true
            }],
            aspectratio: "16:9"
        })
        axios.get(`${serverDomain + data.sub}`)
            .then(response => {
                let stringVTT = response.data.split(/\n\s*\n/);
                stringVTT.shift();
                let sub = stringVTT.map((item) => {
                    var parts = item.split("\n");
                    return {
                        number: parts[0],
                        start: this.timeString2ms(parts[1].split('-->')[0].trim()) / 1000,
                        end: this.timeString2ms(parts[1].split('-->')[1].trim()) / 1000,
                        sub: parts.slice(2, parts.length),
                    };
                });
                this.setState({
                    sub
                })
            })
            .catch(err => console.log(err));
        this.player.on('time', (data) => {
            if (this.state.sub) {
                let currentLine = this.state.sub.find(o => (o.end >= data.position));
                if (currentLine) {
                    if (currentLine.number != this.state.currentLine.number) {
                        this.setState({
                            currentLine: currentLine
                            // .replace(/<\/?[^>]+(>|$)/g, "") bo tag
                        });
                        $(this.refs.scroll.refs.scrollBar.view).animate({scrollTop: this.refs[currentLine.number].offsetTop - 80}, 300, 'linear');
                    }
                }
            }
        });
        this.player.on('ready', () => {
            if (this.props.location.state) {
                if (this.props.location.state.currentTime) {
                    // console.log('propsroute', this.props);
                    this.player.seek(this.props.location.state.currentTime);
                }
            }
        })
    }
    componentDidMount = () => {
        let {data} = this.props;
        this.initPlayer(data);
    }
    componentDidUpdate = (prevProps) =>{
        if (prevProps.data !== this.props.data) {
            // console.log(this.props.scrollBar,'ahihi');
            // $(this.props.scrollBar.refs.scrollBar.view).animate({scrollTop: 0}, 300, 'linear');
            this.props.scrollBar.refs.scrollBar.scrollTop();
        }

    }

    componentWillUnmount = () => {
        this.props.history.replace(
            this.props.history.location.pathname,
            undefined,
        )
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.data !== this.props.data) {
            this.initPlayer(nextProps.data);
        }
    }
    renderModalSave = () => {
            let {currentClickSave} = this.state
            if (this.state.currentClickSave) return (

                <div>
                    <ModalSaveVocabulary data={currentClickSave} isOpen={true}
                                         onClickOutside={this.onClickOutside}/>

                </div>
            )
        }


    onClickBtnSwipe = () => {
        this.setState({
            isPractice: !this.state.isPractice
        })
    }

    onClickTimeBack = () => {
        let timeSet = this.player.getPosition() - parseInt(this.state.valueTimeBack);
        if (
            timeSet < 0

        ) {

            this.player.seek(0);
        }
        else {

            this.player.seek(timeSet);
        }
    }

    onChangeTimeBack = (event) => {
        this.setState({
            valueTimeBack: event.target.value
        })
    }

    onClickSubstract = () => {
        let valueSpeed = Number(parseFloat(this.state.valueSpeed) - 0.1).toFixed(1);
        if (valueSpeed - 0.1 < 0) {
            return
        }
        this.setState({
            valueSpeed
        })
        this.applySpeed(valueSpeed);
    }

    onClickAdd = () => {
        let valueSpeed = Number(parseFloat(this.state.valueSpeed) + 0.1).toFixed(1);
        this.setState({
            valueSpeed
        })

        this.applySpeed(valueSpeed);
    };

    applySpeed = (valueSpeed) => {
        document.getElementById('player').querySelector('video').playbackRate = valueSpeed;
        // document.getElementById('player').querySelector('video').play();

    }

    onClickNext = () => {
        // let {episodes} = this.props.filmDetail;
        // episodes.sort((a, b) => parseInt(a.number) - parseInt(b.number));
        // let index = episodes.findIndex((a) => a.number == this.props.data.number);
        // if (episodes[index + 1]) {
        //     this.props.history.push(`/film/${this.props.filmDetail.slug}/${episodes[index + 1].number}`)
        // }
        this.props.history.push(`/quizz/${this.props.data.id}`)
    }

    render() {
        // this.readFile();
        return (
            <div className="video-film">
                <div className="container">
                    <div className="video-film__wrap">
                        <div className={classNames("video-film__video", {
                            "video-film__video--practice": this.state.isPractice
                        })}>
                            <div className="video-film__player-container">
                                <div className="video-film__player">
                                    <div id="player">Loading the player...</div>
                                </div>
                            </div>
                            <div className="video-film__control">
                                <div className="video-film__control-item video-film__control-item--practice">
                                    <div onClick={this.onClickBtnSwipe}
                                         className={classNames("video-film__btn-practice", {"video-film__btn-practice--close": this.state.isPractice})}>
                                        <div
                                            className={classNames("video-film__btn-swipe", {"video-film__btn-swipe--close": this.state.isPractice})}>

                                        </div>
                                        <div
                                            className={classNames("fa fa-remove video-film__space-swipe", {"video-film__space-swipe--close": this.state.isPractice})}/>
                                    </div>
                                    <div className="video-film__text">
                                        Luyện nghe
                                    </div>
                                </div>
                                <div className="video-film__control-item video-film__control-item--seek">
                                    <div onClick={this.onClickTimeBack} className="video-film__back">
                                        Lùi lại
                                    </div>
                                    <div>
                                        <input onChange={this.onChangeTimeBack} value={this.state.valueTimeBack}
                                               className="video-film__input" type="text"/>
                                    </div>
                                    <div className="video-film__second">
                                        giây
                                    </div>
                                </div>
                                <div className="video-film__control-item video-film__control-item--speed">
                                    <div onClick={this.onClickSubstract} className="video-film__substract">
                                        -
                                    </div>
                                    <div>
                                        <input value={this.state.valueSpeed} className="video-film__input" type="text"/>
                                    </div>
                                    <div onClick={this.onClickAdd} className="video-film__add">
                                        +
                                    </div>
                                </div>
                                <button onClick={this.onClickNext}
                                        className="video-film__control-item video-film__control-item--next-episode">
                                    <span className="video-film__next-text">
                                        Làm bài test &nbsp;
                                    </span>
                                    <i className="fa fa-angle-right fa-2x"></i>
                                </button>
                            </div>
                        </div>
                        {
                            this.state.isPractice ? null : <div className="video-film__sub">
                                <Scrollbars
                                    renderTrackVertical={props => <div {...props}
                                                                       className="scroll-bar__track-vertical"/>}
                                    renderThumbVertical={props => <div {...props}
                                                                       className="scroll-bar__thumb-vertical"/>}
                                    autoHeight={true}
                                    autoHeightMin="100%"
                                    autoHeightMax="100%"
                                    ref="scroll"

                                >
                                    <div className="video-film__wrap-sub">
                                        {
                                            this.renderSub()
                                        }
                                    </div>
                                </Scrollbars>
                            </div>
                        }


                    </div>
                </div>
                {
                    this.renderModalSave()
                }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.app.isLogin
    }
}
export default connect(mapStateToProps, {toggleModalLogin})(withRouter(withCookies(VideoFilm)))