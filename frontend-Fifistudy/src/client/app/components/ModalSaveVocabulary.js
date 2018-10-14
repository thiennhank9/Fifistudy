import Modal from "./CustomComponents";
import React from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import {postSaveVocabulary} from "../actions/api";
import {withCookies} from "react-cookie";
import {connect} from "react-redux";
import {toggleModalLogin} from "../actions/app";
import {getVocabulary} from "../actions/dataUserpage";
// import {post} from '../actions/api'

class ModalSaveVocabulary extends React.Component {
    constructor(props) {
        super(props);
        let {data} = props
        this.state = {
            vocabulary: data.sub[0] ? data.sub[0].replace(/<\/?[^>]+(>|$)/g, "") : "",
            meaning: data.sub[1] ? data.sub[1].replace(/<\/?[^>]+(>|$)/g, "") : "",
            current_time: data.start,
            episode_id: data.episode_id
        };
        // this.state={
        //     vocabulary:"",
        //     meaning:""
        // }
    }

    onClickSave = () => {
        // debugger
        if (this.props.isLogin) {
            let {cookies} = this.props;
            let token = cookies.get("token");
            postSaveVocabulary(this.state, token).then(
                response => {
                    if (response.data.errors === null) {
                        // alert("Lưu thành công");
                        this.props.onClickOutside();
                    }
                    else {
                        alert('Lưu thất bại')
                    }
                }
            )
        }
        else {
            this.props.toggleModalLogin();
        }
    }
    onChangeTextInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onClickCancel = () => {
        this.props.onClickOutside();
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} onClickOutside={this.props.onClickOutside}>
                <h1 className="modal-title">LƯU TỪ VỰNG</h1>
                <Input type="text" onChange={this.onChangeTextInput} name="vocabulary" placeholder="Từ vựng"
                       value={this.state.vocabulary}/>
                <Input type="text" onChange={this.onChangeTextInput} name="meaning" placeholder="Nghĩa"
                       value={this.state.meaning}/>
                <button onClick={this.onClickSave} type="button"
                        className="action-button"
                >
                    Lưu
                </button>
                <button onClick={this.onClickCancel} type="button"
                        className="action-button action-button__cancel"
                >
                    Hủy
                </button>
            </Modal>
        )
    }
}

ModalSaveVocabulary.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
    return {
        isLogin: state.app.isLogin
    }
}

export default connect(mapStateToProps, {getVocabulary, toggleModalLogin})(withCookies(ModalSaveVocabulary))

