import SectionFilm from "../components/SectionFilm";
import React from "react";
import Film from "../components/Film";

import {connect} from "react-redux";


class MostViewContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderFilm = (data) => {
        return data.map(item => {
            return (
                <div className="section__item">
                    <Film data={item}/>
                </div>
            )
        })
    };

    render() {
        if (this.props.mostView) {
            if (this.props.mostView.errors === null) {
                return (

                    <SectionFilm title="PHIM ĐƯỢC XEM NHIỀU NHẤT">
                        {this.renderFilm(this.props.mostView.data)}
                    </SectionFilm>
                )
            }
        }
        return null
    }
}


const mapStateToProps = state => {
    return {
        mostView: state.dataHomepage.mostView
    }
}

export default connect(mapStateToProps)(MostViewContainer)