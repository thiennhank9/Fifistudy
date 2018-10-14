import React from "react";
import onClickOutside from "react-onclickoutside";
class ModalContent extends React.Component {
    handleClickOutside = () => {
        this.props.onClickOutside();
    }

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    render() {
        return (
            <div className="modal">
                {this.props.children}
            </div>
        )
    }
}

export default onClickOutside(ModalContent)