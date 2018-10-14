import Scrollbars from 'react-custom-scrollbars';

import React from "react";

class ScrollBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Scrollbars
                ref="scrollBar"
                autoHide={true}
                renderTrackVertical={props => <div {...props} className="scroll-bar__track-vertical"/>}
                renderThumbVertical={props => <div {...props} className="scroll-bar__thumb-vertical"/>}
                autoHeight={true}
                autoHeightMin="100%"
                autoHeightMax="100%"
            >
                {this.props.children}
            </Scrollbars>
        )
    }
}

export default ScrollBar;