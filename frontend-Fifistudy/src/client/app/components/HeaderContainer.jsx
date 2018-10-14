import React from "react";
import Logo from "./Logo.jsx";
import Menu from "./Menu";
// import {Link} from 'react-router';
import {Link} from "react-router-dom";
import SearchContainer from "./SearchContainer";
import {toggleModalLogin} from "../actions/app";
import classNames from "classnames";
import {getLogout} from "../actions/api";
import {connect} from "react-redux";
import {withCookies} from "react-cookie";
import {serverDomain} from "../config/server";
import {defaultAvatar} from "../config/const";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: null,
        };
    }

    onClickMenu = (menu) => {
        this.setState({
            open: menu === this.state.open ? null : menu
        })
    }

    closeMenu = () => {
        this.setState({
            open: null
        })
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

    renderAccountSection = () => {
        if (this.props.userInfo) {

            if (this.props.userInfo.data.errors == null) {
                let userInfo = this.props.userInfo.data.data;
                return (
                    <div
                        onClick={this.onClickMenu.bind(this, "account")}
                        className={classNames("header__item header__item--has-children", {"header__item--open": this.state.open === "account"})}
                    >
                        <div className="header__profile">
                            <div className="header__wrap-avatar"
                                 style={{backgroundImage: `url(${userInfo.avatar ? serverDomain + userInfo.avatar : defaultAvatar})`}}>
                                {/*<ReactImageFallback*/}
                                {/*src={`http://localhost:8000${userInfo.avatar}`}*/}
                                {/*fallbackImage="http://placehold.it/50x50"*/}
                                {/*initialImage="http://placehold.it/50x50"*/}
                                {/*alt="Avatar"*/}
                                {/*className="" />*/}
                                {/*<img src="http://placehold.it/50x50" alt="Avatar" className="header__avatar"/>*/}
                            </div>
                            <div className="header__name">
                                {
                                    (userInfo.first_name && userInfo.last_name) ? `${userInfo.first_name || ""} ${userInfo.last_name || ""}` : userInfo.username
                                }
                            </div>
                        </div>
                        <Menu data={[{
                            name: "Vào trang cá nhân",
                            link: "/user", onClick: null
                        },
                            {
                                name: "Đăng xuất",
                                link: null
                                , onClick: this.onClickLogout
                            }
                        ]} closeMenu={this.closeMenu} outsideClickIgnoreClass="header__item--has-children"
                              isOpen={this.state.open === "account"}/>
                    </div>
                )


            }
        }
        return (<div className="header__item header__item--account">
            <span onClick={this.onClickLogin} className="header__login">Đăng nhập / </span>
            <Link to="/signup" className="header__signup">Đăng kí</Link>
        </div>)
    }

    onClickLogin = () => {
        // this.setState({
        //     isModalOpen: true
        // })
        this.props.toggleModalLogin();
    }

    render() {
        return (
            <div className="header">
                <div className=" container header__container">
                    <Link to="/" className="header__item">
                        <Logo/>
                    </Link>
                    <div
                        onClick={this.onClickMenu.bind(this, "phim")}
                        className={classNames("header__item header__item--has-children", {"header__item--open": this.state.open === "phim"})}
                    >
                        Phim
                        <Menu data={[
                            {
                                name: "Phim mới nhất",
                                link: "/lastest",
                                onClick: null,
                            },
                            {
                                name: "Phim mới được quan tâm nhiều",
                                link: "/much-interest",
                                onClick: null,
                            },
                            {
                                name: "Phim được xem nhiều",
                                link: "/high-rating",
                                onClick: null,
                            }
                        ]} closeMenu={this.closeMenu}
                              outsideClickIgnoreClass="header__item--has-children"
                              isOpen={this.state.open === "phim"}/>
                    </div>
                    {/*<div*/}
                        {/*onClick={this.onClickMenu.bind(this, "blog")}*/}
                        {/*className={classNames("header__item header__item--has-children", {"header__item--open": this.state.open === "blog"})}*/}
                    {/*>*/}
                        {/*Blog*/}
                        {/*<Menu data={[*/}
                            {/*{*/}
                                {/*name: "Kinh nghiệm học tiếng Anh",*/}
                                {/*link: "/",*/}
                                {/*onClick: null,*/}
                            {/*},*/}
                            {/*{*/}
                                {/*name: "Tài liệu",*/}
                                {/*link: "/",*/}
                                {/*onClick: null,*/}
                            {/*},*/}
                            {/*{*/}
                                {/*name: "Khác",*/}
                                {/*link: "/",*/}
                                {/*onClick: null,*/}
                            {/*}*/}
                        {/*]} closeMenu={this.closeMenu}*/}
                              {/*outsideClickIgnoreClass="header__item--has-children"*/}
                              {/*isOpen={this.state.open === "blog"}/>*/}
                    {/*</div>*/}
                    <SearchContainer/>

                    {this.renderAccountSection()}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        userInfo: state.app.userInfo
    }
}

export default connect(mapStateToProps, {toggleModalLogin})(withCookies(Header));