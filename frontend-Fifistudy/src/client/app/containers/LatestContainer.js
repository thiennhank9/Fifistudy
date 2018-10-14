import SectionFilm from "../components/SectionFilm";
import React from "react";
import Film from "../components/Film";

import {connect} from "react-redux";


class LatestContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderFilm = (data) => {
        return data.map(item => {
            return (
                <div key={item.id} className="section__item">
                    <Film data={item}/>
                </div>
            )
        })
    };

    render() {
        if (this.props.mostLatest) {
            if (this.props.mostLatest.errors === null) {
                return (

                    <SectionFilm title="PHIM MỚI NHẤT">
                        {this.renderFilm(this.props.mostLatest.data)}
                    </SectionFilm>
                )
            }
        }
        return null
    }
}


const mapStateToProps = state => {
    return {
        mostLatest: state.dataHomepage.mostLastest
    }
}

export default connect(mapStateToProps)(LatestContainer)