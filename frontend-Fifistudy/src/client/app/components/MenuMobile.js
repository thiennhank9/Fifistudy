import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {Link} from "react-router-dom";
import SearchContainer from "../components/SearchContainer";

import {defaultAvatar} from "../config/const";
import {serverDomain} from "../config/server";

export default class MenuMobile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        // console.log(this.props);
        return (
            <div className="menu-mobile">
                <div className="menu-mobile__row">
                    <div onClick={this.props.onClickBurgerButton} className="menu-mobile__item menu-mobile__burger">
                        <i className="fa fa-bars"></i>
                    </div>
                    <Link to="/" className="menu-mobile__item menu-mobile__logo">
                        <div className="logo menu-mobile__logo-mobile">FifiStudy</div>
                    </Link>

                    {
                        _.has(this.props.userInfo, "data.data.avatar") ?

                            <Link to="/user" className="menu-mobile__item menu-mobile__avatar">
                                <img className="menu-mobile__img-avatar"
                                     src={this.props.userInfo.data.data.avatar ? serverDomain + this.props.userInfo.data.data.avatar : defaultAvatar}
                                     alt=""/>
                            </Link>

                            : null
                    }
                </div>
                {/*<div className="menu-mobile__row">*/}
                {/*<div className=>*/}
                {/*<input className= type="text" placeholder="Tìm kiếm..."/>*/}
                {/*</div>*/}
                {/*</div>*/}
                <SearchContainer classNameContainer="menu-mobile__item menu-mobile__search"
                                 classNameInput="menu-mobile__input-search">

                </SearchContainer>

            </div>
        )
    }
}

MenuMobile.PropTypes = {
    onClickBurgerButton: PropTypes.func.isRequired,
}