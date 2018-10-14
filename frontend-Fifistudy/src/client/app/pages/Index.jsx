import React from "react";
import SliderBannerContainer from "../containers/SliderBannerContainer";
import Intro from "../components/Intro";
import FadeTransition from "../components/FadeTransition";
import SectionBlog from "../components/SectionBlog";
import Footer from "../components/Footer";
import Film from "../components/Film";
import MostViewContainer from "../containers/MostViewContainer";
import LatestContainer from "../containers/LatestContainer";
import {connect} from "react-redux";
import {getLastest, getMostView, getPromotes} from "../actions/dataHomepage";
import {withCookies} from "react-cookie";

class Index extends React.Component {
    componentWillMount = () => {
        this.initPage();

    }

    initPage = () => {
        let {cookies} = this.props;
        let token = cookies.get("token");
        this.props.getPromotes();
        this.props.getLastest(token);
        this.props.getMostView(token);
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.isLogin != this.props.isLogin) {
            this.initPage();
        }
    }


    constructor(props) {
        super(props);
        this.state = {};
    }

    renderFilm = () => {
        return [{}, {}, {}, {}, {}, {}, {}, {}].map(item => {
            return (
                <div className="section__item">
                    <Film/>
                </div>
            )
        })
    };

    render() {
        return (
            <FadeTransition>
                <div className="index-page">
                    {/*<Scrollbars*/}
                    {/*autoHide={true}*/}
                    {/*renderTrackVertical={props => <div {...props} className="scroll-bar__track-vertical"/>}*/}
                    {/*renderThumbVertical={props => <div {...props} className="scroll-bar__thumb-vertical"/>}*/}
                    {/*autoHeight={true}*/}
                    {/*autoHeightMin="100%"*/}
                    {/*autoHeightMax="100%"*/}
                    {/*>*/}


                    <SliderBannerContainer/>
                    <Intro/>
                    <MostViewContainer/>
                    <SectionBlog/>
                    {/*<Section title="PHIM ĐƯỢC QUAN TÂM NHIỀU NHẤT">*/}
                    {/*{this.renderFilm()}*/}
                    {/*</Section>*/}
                    <LatestContainer/>
                    <Footer/>
                    {/*</Scrollbars>*/}
                </div>
            </FadeTransition>
        )
    }
}
const mapStateToProps = state => {
    return {
        isLogin: state.app.isLogin
    }
}
export default  connect(mapStateToProps, {getPromotes, getLastest, getMostView})(withCookies(Index))