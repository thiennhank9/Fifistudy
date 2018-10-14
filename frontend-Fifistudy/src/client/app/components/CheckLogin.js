import React from "react";

class CheckLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                {
                    this.props.children
                }
            </div>

        )
    }
}