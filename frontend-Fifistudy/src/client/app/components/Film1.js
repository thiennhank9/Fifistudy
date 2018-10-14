import React from "react";
import Level from "./Level.jsx";
import {serverDomain} from "../config/server";
import Star from "../components/Star";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

class Film1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let {data} = this.props;
        return (
            <Link to={`/film/${data.slug}`} className="related-film">
                <div className="related-film__wrap-image">
                    <img src={serverDomain + data.thumbnail} alt="" className="related-film__image"/>
                </div>
                <div className="related-film__info">
                    <div className="related-film__eng-name" title={data.english_name}>
                        {data.english_name}
                    </div>
                    <div className="related-film__vi-name" title={data.vietnamese_name}>
                        {data.vietnamese_name}
                    </div>
                    <div className="related-film__level">
                        <Level level={data.difficult_level}/>
                    </div>
                    <div className="related-film__level">
                        <Star score={data.average_score}/>
                    </div>


                </div>
            </Link>
        )
    }
}

Film1.propTypes = {
    isLevel: PropTypes.bool
}

Film1.defaultProps = {
    isLevel: false
}

export default Film1