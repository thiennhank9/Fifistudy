import React from "react";

import {CSSTransition} from "react-transition-group";

class FadeTransition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            in: true
        }
    }

    componentWillUnmount = () => {
        this.setState({
            in: false
        })
    }

    render = () => {
        return (
            <CSSTransition
                timeout={this.props.timeout}
                classNames={this.props.classNames}
                in={this.state.in}>
                {this.props.children}
            </CSSTransition>

        )
    }

}

FadeTransition.defaultProps = {
    timeout: 500,
    classNames: "fade"
}
export default  FadeTransition