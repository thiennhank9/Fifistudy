import React from "react";
import {serverDomain} from "../config/server";
import {defaultAvatar} from "../config/const";
import {withCookies} from "react-cookie";
import {postUpdateAvatar} from "../actions/api";
import {getUserInfo} from "../actions/app";
import {connect} from "react-redux";

class UserAvatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange = e => {
        // alert('change')
        // alert('cahange')
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        // alert('hi')
        let {cookies} = this.props;
        let token = cookies.get("token")
        let data = new FormData();
        data.append("avatar", file);
        let headers = {headers: {Authorization: `Token ${token}`}}
        // debugger
        postUpdateAvatar(data, headers)
            .then(res => {
                if (res.data.errors) {
                    // let errors = res.data.errors.map(item => {
                    //     return SERVER_ERRORS[item.errorCode]
                    // });
                    alert(SERVER_ERRORS[res.data.errors[0].errorCode])
                    // this.setState({
                    //     serverErrors: errors,
                    //     disableNextFour: true,
                    // })
                }
                else {
                    // Thanh cong
                    // alert('Upload Thành công');
                    this.props.getUserInfo(token);
                    // this.setState({
                    //     disableNextFour: false,
                    //     serverErrors: [],
                    // })
                    // this.animateNext(el);
                }
            })
    }

    render() {
        let {data} = this.props
        return (
            <div className="user-avatar user-avatar--user">
                <div className="user-avatar__wrap"
                     style={{backgroundImage: `url(${data.avatar ? serverDomain + data.avatar : defaultAvatar})`}}>
                    {/*<img src={} alt="" className="user-avatar__img"/>*/}
                    <label className="user-avatar__edit" htmlFor="avatar">
                        <i className="fa fa-plus-circle user-avatar__icon"></i>
                    </label>
                    <input onChange={this.onChange} id="avatar" type="file" hidden={true}/>

                </div>
                <div className="user-avatar__name">
                    {(data.first_name && data.last_name) ? `${data.first_name || ""} ${data.last_name || ""}` : data.username}
                    {/*{data.first_name && data.lastname + " " + data.last_name}*/}
                </div>
            </div>
        )
    }
}

export default connect(null, {getUserInfo})(withCookies(UserAvatar))