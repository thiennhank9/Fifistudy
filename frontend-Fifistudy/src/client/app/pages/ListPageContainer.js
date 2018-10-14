import React from "react";
import Footer from "../components/Footer";
import FadeTransition from "../components/FadeTransition";
import Section from "../components/SectionFilm";
import {withCookies} from "react-cookie";
import {connect} from "react-redux";
import {deleteListFilm, getListPage, resetListFilm} from "../actions/dataListPage";
import Film from "../components/Film";
import {MAX_PAGE_LIST, ORDER_BY} from "../constants/apiPath";

import Scrollbars from '../components/ScrollBar';

const MAP_ROUTE_TO_ORDER_BY = {
    "lastest": ORDER_BY.createdAtReduce,
    "high-rating": ORDER_BY.reviewNumberReduce,
    "much-interest": ORDER_BY.saveNumberReduce,
}

const MAP_ROUTE_TO_TITLE = {
    "lastest": "PHIM MỚI NHẤT",
    "high-rating": "PHIM HOT NHẤT",
    "much-interest": "PHIM ĐƯỢC QUAN TÂM NHIỀU NHẤT",
}

class ListPageContainer extends React.Component {
    componentWillUnmount = () => {
        this.props.deleteListFilm();
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount = () => {
        this.getData(this.props.match.params.slugList, this.props.dataListPage.nextPage);
    }

    renderFilm = () => {
        return this.props.dataListPage.data.map(item => {
            return (
                <div key={item.id} className="section__item">
                    <Film data={item}/>
                    {/*ahihi*/}
                </div>
            )
        })
    };

    getData = (slugList, nextPage) => {
        let {cookies} = this.props;
        let token = cookies.get("token");
        // alert(token)
        this.props.getListPage(MAP_ROUTE_TO_ORDER_BY[slugList], nextPage, MAX_PAGE_LIST, token);
    }
    onClickSeeMore = () => {
        this.getData(this.props.match.params.slugList, this.props.dataListPage.nextPage);
    }
    renderLoadingAndSeeMore = () => {
        if (this.props.dataListPage.isLoading) {
            return (
                <div id="spinner" className="search-result search-result__more">
                    <div className="loader">
                        <div className="inner one"></div>
                        <div className="inner two"></div>
                        <div className="inner three"></div>
                    </div>
                </div>
            )
        }
        else {
            if (this.props.dataListPage.hasMore) {
                return (
                    <div id="see-more" key="search" className="search-result search-result__more">
                        <div onClick={this.onClickSeeMore}
                             className="section-user-info__btn section-user-info__btn--search">Xem
                            thêm <i
                                className="fa fa-caret-down"></i></div>
                    </div>
                )

            }
        }
    }

    componentWillReceiveProps = (nextProps) => {


        let {cookies} = this.props;
        let token = cookies.get("token");
        if (nextProps.match.params.slugList !== this.props.match.params.slugList) {
            this.props.resetListFilm(MAP_ROUTE_TO_ORDER_BY[nextProps.match.params.slugList], 1, MAX_PAGE_LIST, token);
        }
    }

    render() {
        return (

            <FadeTransition>
                <div className="list-page">
                    <Scrollbars>

                        <Section title={MAP_ROUTE_TO_TITLE[this.props.match.params.slugList]}>

                            {this.renderFilm()}


                        </Section>
                        {
                            this.renderLoadingAndSeeMore()
                        }
                        <div className="divider"></div>

                        <Footer/>
                    </Scrollbars>
                </div>
            </FadeTransition>

        )
    }
}

const mapStateToProps = state => {
    return {
        dataListPage: state.dataListPage.dataListPage,
        isLogin: state.app.isLogin
    }
}
export default  connect(mapStateToProps, {getListPage, resetListFilm, deleteListFilm})(withCookies(ListPageContainer))