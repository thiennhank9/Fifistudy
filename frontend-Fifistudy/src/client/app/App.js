import React from "react";
import Header from "./components/HeaderContainer.jsx";
import {slide as Menu} from "react-burger-menu";
import DetailPageContainer from "./pages/DetailContainer";
import Index from "./pages/Index.jsx";
import {TransitionGroup} from "react-transition-group";
import {Switch} from "react-router";
import MenuMobile from "./components/MenuMobile";
import {withCookies} from "react-cookie";
import {instanceOf} from "prop-types";
import {doLogin, getUserInfo, toggleModalLogin} from "./actions/app";
import FilmIntroContainer from "./pages/FilmIntroContainer";

import QuizzPageContainer from './pages/QuizzPageContainer'
import {connect} from "react-redux";
import SignUp from "./pages/SignUp";
import Userpage from "./pages/UserPage";
import ListPage from "./pages/ListPageContainer";
import {serverDomain} from "./config/server";
import {getLogout} from "./actions/api";
import {defaultAvatar} from "./config/const";
import Scrollbars from './components/ScrollBar';
import {BrowserRouter as Router, Link, Redirect, Route} from "react-router-dom";

import ModalLogin from "./components/ModalLogin";
// import {Transition} from 'react-transition-group'

//
// const duration = 300;
// const defaultStyle = {
//     transition: `opacity ${duration}ms ease-in-out`,
//     opacity: 0,
// }
//
// const transitionStyles = {
//     entering: {opacity: 0},
//     entered: {opacity: 1},
// };


class AppContainer extends React.Component {
    onClickOutside = () => {
        this.props.toggleModalLogin();
    }

    constructor(props) {
        super(props);
        this.state = {show: false, isOpenMenuMobile: false, marginTop: 0};
    }

    componentWillMount = () => {
        const {cookies} = this.props;
        if (cookies.get("token")) {
            this.props.getUserInfo(cookies.get("token"));
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.isLogin !== this.props.isLogin) {
            if (nextProps.isLogin) {
                this.props.doLogin(true);
            }
            else {
                this.props.doLogin(false)
            }
        }
    }

    //
    // componentWillMount() {
    //    console.log(this.props,'location');
    // }
    //
    // componentWillUnmount() {
    //     console.log('unmount');
    // }

    // handleToggle() {
    //     this.setState(({ show }) => ({
    //         show: !show
    //     }))
    // }
    renderUserpage = () => {
        const {cookies} = this.props;
        if (cookies.get("token")) {
            return (
                <Userpage/>
            )
        }
        return <Redirect to="/"/>
    }
    onClickBurgerButton = () => {
        this.setState({
            isOpenMenuMobile: true
        })
    }

    calcMarginTop = () => {
        const height = document.getElementsByClassName("menu-mobile")[0].clientHeight;
        this.setState({
            marginTop: height
        })
    }

    componentDidMount = () => {
        // window.onresize = () => {
        //     this.calcMarginTop();
        // }
        this.calcMarginTop();
    }

    renderUserInfo = () => {
        if (_.has(this.props.userInfo, "data.errors")) {
            if (this.props.userInfo.data.errors == null) {
                return <div className="user-avatar user-avatar--menu">
                    <Link to="/user" className="user-avatar__wrap"
                          style={{backgroundImage: `url(${this.props.userInfo.data.data.avatar ? serverDomain + this.props.userInfo.data.data.avatar : defaultAvatar})`}}>

                    </Link>
                    <div className="user-avatar__name">
                        {(this.props.userInfo.data.data.first_name && this.props.userInfo.data.data.last_name) ? `${this.props.userInfo.data.data.first_name || ""} ${this.props.userInfo.data.data.last_name || ""}` : this.props.userInfo.data.data.username}
                        {/*{data.first_name && data.lastname + " " + data.last_name}*/}
                    </div>
                </div>
            }
        }
        return null
    }

    onClickLogout = () => {
        let {cookies} = this.props;

        if (cookies.get("token")) {
            let token = cookies.get("token");

            getLogout(token).then(res => {
                if (res.data.errors == null) {
                    cookies.remove("token", {path: "/"});
                    window.location.reload();
                }
            })

        }
    }

    onClickLogin = () => {
        // this.setState({
        //     isModalOpen: true
        // })
        this.props.toggleModalLogin();
    }

    render() {
        // const { show } = this.state;


        return (
            <Router basename={"/home"}>
                <Scrollbars
                    autoHide={true}
                    renderTrackVertical={props => <div {...props} className="scroll-bar__track-vertical"/>}
                    renderThumbVertical={props => <div {...props} className="scroll-bar__thumb-vertical"/>}
                    autoHeight={true}
                    autoHeightMin="100%"
                    autoHeightMax="100%"
                >
                    <div className="app">


                        <Header/>
                        <Menu menuClassName={ "left-bar" } width={200} pageWrapId="page-wrap" outerContainerId="app"
                              isOpen={ this.state.isOpenMenuMobile }>

                            {this.renderUserInfo()}
                            <div className="user-menu">
                                <div className="user-menu__ul user-menu__ul--menu">

                                    {
                                        !this.props.isLogin ?
                                            <div onClick={this.onClickLogin} className="user-menu__li">
                                                <i className="fa fa-sign-in user-menu__icon"></i>
                                                <span className="user-menu__text">
                                            Đăng nhập
                                        </span>
                                            </div> : null
                                    }
                                    {
                                        !this.props.isLogin ? <Link to="/signup" className="user-menu__li">
                                            <i className="fa fa-edit user-menu__icon"></i>
                                            <span className="user-menu__text">
                                            Đăng kí
                                        </span>
                                        </Link> : null
                                    }

                                    <Link to="/" className="user-menu__li">
                                        <i className="fa fa-home user-menu__icon"></i>
                                        <span className="user-menu__text">
                                            Trang chủ
                                        </span>
                                    </Link>
                                    <Link to="/newest" className="user-menu__li">
                                        <i className="fa fa-film user-menu__icon"></i>
                                        <span className="user-menu__text">
                                           Phim mới
                                        </span></Link>
                                    <Link to="/much-interest" className="user-menu__li">
                                        <i className="fa fa-film user-menu__icon"></i>
                                        <span className="user-menu__text">
                                           Phim hay
                                        </span></Link>
                                    <Link to="high-rating" className="user-menu__li">
                                        <i className="fa fa-film user-menu__icon"></i>
                                        <span className="user-menu__text">
                                          Phim hot
                                        </span></Link>
                                    {
                                        this.props.isLogin ? <Link to="/user" className="user-menu__li">
                                            <i className="fa fa-user-o user-menu__icon"></i>
                                            <span className="user-menu__text">
                                          Quản lý tài khoản
                                        </span></Link> : null
                                    }

                                    {this.props.isLogin ? <div onClick={this.onClickLogout} className="user-menu__li">
                                        <i className="fa fa-sign-out user-menu__icon"></i>
                                        <span className="user-menu__text">
                                          Đăng xuất
                                        </span></div> : null}


                                </div>
                            </div>

                        </Menu>

                        <div id="page-wrap">
                            <MenuMobile userInfo={this.props.userInfo} onClickBurgerButton={this.onClickBurgerButton}>

                            </MenuMobile>

                            <div style={{
                                paddingTop: this.state.marginTop,
                                height: `calc(100vh - ${ this.state.marginTop})`
                            }} className="page-content">
                                <TransitionGroup>
                                    <Switch>
                                        <Route exact path="/" component={Index}/>
                                        <Route exact path="/quizz/:episodeId" component={QuizzPageContainer}/>
                                        <Route exact path="/film/:slug/:episodeId" component={DetailPageContainer}/>
                                        <Route exact path="/film/:slug" component={FilmIntroContainer}/>
                                        <Route exact path="/signup" component={SignUp}/>
                                        <Route exact path="/user" render={this.renderUserpage}/>
                                        <Route exact path="/:slugList" component={ListPage}/>
                                    </Switch>
                                </TransitionGroup>

                                <ModalLogin onClickOutside={this.onClickOutside} isOpen={this.props.isOpenModalLogin}/>
                            </div>


                        </div>
                    </div>
                </Scrollbars>
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.app.isLogin,
        isOpenModalLogin: state.app.isOpenModalLogin,
        userInfo: state.app.userInfo
    }
}


export default withCookies(connect(mapStateToProps, {getUserInfo, toggleModalLogin, doLogin})(AppContainer))