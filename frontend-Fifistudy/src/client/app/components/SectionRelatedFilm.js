import React from "react";
import Film1 from "./Film1";
import {withRouter} from "react-router";

class SectionRelatedFilm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderFilm = () => {
        return this.props.data.map(item => {
            if (item.slug === this.props.match.params.slug) {
                return
            }
            return <Film1 key={item.id} data={item}/>
        })
    }

    render() {
        return (
            <div className="section-related-film">
                {
                    this.renderFilm()
                }
            </div>
        )
    }
}

export default withRouter(SectionRelatedFilm)