import Modal from "./CustomComponents";
import React from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import {putEditVocabulary} from "../actions/api";
import {withCookies} from "react-cookie";
import {connect} from "react-redux";
import {getVocabulary} from "../actions/dataUserpage";

class ModalEditVocabulary extends React.Component {
    constructor(props) {
        super(props);
        let {vocabulary, episode, film} = this.props.data;
        if (vocabulary) {
            this.state = {
                vocabulary: vocabulary.vocabulary,
                meaning: vocabulary.meaning
            };
        }

    }

    onClickSave = () => {
        let {cookies} = this.props;
        let token = cookies.get("token");
        putEditVocabulary(this.props.data.id, this.state, token).then(response => {
            if (response.errors === null) {
                this.props.getVocabulary(token);
                this.props.onClickOutside();
            }
        })
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
                <h1 className="modal-title">SỬA TỪ VỰNG</h1>
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

ModalEditVocabulary.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
}

export default connect(null, {getVocabulary})(withCookies(ModalEditVocabulary))

