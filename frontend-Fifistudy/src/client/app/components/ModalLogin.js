import React from "react";
import Input from "../components/Input";
import {withCookies} from "react-cookie";
import {connect} from "react-redux";
/**
 *
 * Created by liemn on 11/13/2017.
 */
import {postLogin} from "../actions/api";
import {doLogin, getUserInfo} from "../actions/app";
import Modal from "./customComponents/Modal";

class ModalLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onClickLogin = () => {
        let data =
            {
                "username": this.state.username,
                "password": this.state.password
            }
        let {cookies} = this.props;
        postLogin(data).then(res => {
            if (res.data.errors == null) {
                let date = new Date();
                date = date.setDate(date.getDate() + 1);
                date = new Date(date);
                // debugger
                cookies.set("token", res.data.data.token, {
                    expires: date,
                    path: "/"
                });
                this.props.getUserInfo(res.data.data.token);
                this.props.doLogin(true);
                this.props.onClickOutside();
            }
        })
    }

    onChangeTextInput = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} onClickOutside={this.props.onClickOutside}>
                <h1 className="modal-title">Đăng nhập</h1>
                <Input type="text" onChange={this.onChangeTextInput} name="username" placeholder="Tên đăng nhập"
                       value={this.state.username}/>
                <Input type="password" onChange={this.onChangeTextInput} name="password" placeholder="Mật khẩu"
                       value={this.state.password}/>
                <button onClick={this.onClickLogin} type="button"
                        className="action-button"
                >
                    Tiếp theo
                </button>
            </Modal>
        )
    }
}
export default connect(null, {getUserInfo, doLogin})(withCookies(ModalLogin))
