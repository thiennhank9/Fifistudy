import React from "react";
import Banner from "../components/Banner";

import FadeTransition from "../components/FadeTransition";

import Scrollbars from '../components/ScrollBar';
import ListActorContainer from "../components/ListActorContainer";

import SectionDetailExtra from "../components/SectionDetailExtra";
import Footer from "../components/Footer";
import {serverDomain} from "../config/server";

export default class FilmIntro extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FadeTransition>
                <div className="film-intro-page">
                    <div className="detail-page__overlay"
                         style={{backgroundImage: `url(${serverDomain + this.props.data.thumbnail})`}}>
                    </div>
                    <Scrollbars>
                        <Banner data={this.props.data}/>
                        <ListActorContainer/>
                        <SectionDetailExtra data={this.props.data}/>

                        <Footer/>


                    </Scrollbars>
                </div>
            </FadeTransition>
        )
    }
}
//
// const mapStateToProps = state => {
//     return {
//         data: state.dataIntropage.film.data.data
//     }
// }
//
//
// export default connect(mapStateToProps)(FilmIntro)