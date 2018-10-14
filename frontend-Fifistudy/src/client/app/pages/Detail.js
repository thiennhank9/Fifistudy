import React from "react";
import {serverDomain} from "../config/server";

import FadeTransition from "../components/FadeTransition";
import FilmTitle from "../components/FilmTitle";
import VideoFilm from "../components/VideoFilm";
import Episode from "../components/Episode";
import SectionDetailExtra from "../components/SectionDetailExtra";
import Footer from "../components/Footer";
import {getFilmByDifficult} from "../actions/dataIntropage";
import {connect} from "react-redux";

import Scrollbars from '../components/ScrollBar';

class Detail extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
        let {filmDetail, episode} = this.props;
        this.props.getFilmByDifficult(filmDetail.difficult_level)

    }


    render() {
        let {filmDetail, episode} = this.props;
        return (
            <FadeTransition>
                <div className="detail-page">

                    <div className="detail-page__overlay"
                         style={{backgroundImage: `url(${serverDomain + filmDetail.thumbnail})`}}>
                    </div>
                    <Scrollbars ref="scrollBar">
                        <FilmTitle enName={filmDetail.english_name} viName={filmDetail.vietnamese_name}/>
                        <VideoFilm scrollBar={this.refs.scrollBar} filmDetail={filmDetail} data={episode}/>
                        <Episode data={filmDetail}/>
                        <SectionDetailExtra data={filmDetail}/>

                        <Footer/>
                    </Scrollbars>
                </div>
            </FadeTransition>

        )
    }
}
export default connect(null, {getFilmByDifficult})(Detail)