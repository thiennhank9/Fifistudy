import React from "react";
import PropTypes from "prop-types";


class Spinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="spinner" className={this.props.className}>
                <div className="loader">
                    <div className="inner one"/>
                    <div className="inner two"/>
                    <div className="inner three"/>
                </div>
            </div>
        )
    }
}

Spinner.propTypes = {
    className: PropTypes.string.isRequired
}

export default Spinner