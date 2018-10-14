import SliderBanner from "../components/SliderBanner.jsx";
import React from "react";

import {connect} from "react-redux";


class SliderBannerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.props.promotes) {
            if (this.props.promotes.errors === null) {
                // console.log(this.props.promotes.data)
                return <SliderBanner data={this.props.promotes.data}/>
            }

        }
        return null
    }
}


const mapStateToProps = state => {
    return {
        promotes: state.dataHomepage.promotes
    }
}

export default connect(mapStateToProps)(SliderBannerContainer)