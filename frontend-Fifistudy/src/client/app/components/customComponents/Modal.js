import React from "react";
import InitialModal from "react-modal";
import ModalContent from "./ModalContent";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <InitialModal
                isOpen={this.props.isOpen}
                // onAfterOpen={afterOpenFn}
                // onRequestClose={requestCloseFn}
                closeTimeoutMS={0}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        zIndex: 9999999999
                    },
                    content: {
                        position: 'absolute',
                        top: '200px',
                        left: '0',
                        right: '0',
                        margin: "auto",
                        maxWidth: "400px",
                        boxShadow: "0 0 15px 1px rgba(0, 0, 0, 0.4)",
                        borderRadius: "3px",
                        bottom: 'auto',
                        border: '1px solid #ccc',
                        background: '#fff',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        outline: 'none',
                        padding: "20px 30px"

                    }
                }}
                // contentLabel="Modal"
            >
                <ModalContent onClickOutside={this.props.onClickOutside}>
                    {
                        this.props.children
                    }
                </ModalContent>
            </InitialModal>
        )
    }
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClickOutside: PropTypes.func.isRequired
}