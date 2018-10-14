import React from "react";
import FadeTransition from "../components/FadeTransition";
require('imports-loader?jQuery=jquery!letteringjs');
// window.$ = window.jQuery = jQuery;
import 'letteringjs';


class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            in: true
        };
    }

    componentDidMount = () => {
        $(document).ready(function () {
            $('.loading').lettering();
        })
    }

    componentWillUnmount = () => {
        this.setState({
            in: false
        })
    }

    render() {
        return (
            <FadeTransition timeout={350}
                            classNames="fade"
                            shouldShow={this.state.in}>
                <div ref="loading" className="loading">
                    Loading...
                </div>
            </FadeTransition>
        )
    }
}

export default Loading