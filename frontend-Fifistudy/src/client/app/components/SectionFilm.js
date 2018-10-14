import React from "react";

import FlipMove from "react-flip-move";
class SectionFilm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="section">
                <div className="container section__title">
                    {
                        this.props.title
                    }
                </div>
                <div className="divider"></div>
                <FlipMove className="container section__body" enterAnimation="fade" leaveAnimation="fade">

                    {this.props.children}
                </FlipMove>
                <div className="divider"></div>
            </div>
        )

    }
}
export default SectionFilm