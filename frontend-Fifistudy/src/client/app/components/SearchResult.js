import React from "react";
import onClickOutside from "react-onclickoutside";
import Spinner from "./Spinner";

import Film1 from "../components/Film1";
import ScrollBar from "./ScrollBar";

class SearchResult extends React.Component {
    handleClickOutside = () => {
        this.props.closeSearchContainer();
    }
    renderItem = () => {
        return this.props.data.data.map(item => {
            return <div onClick={() => {
                this.props.closeSearchContainer();
            }} id={`item${item.id}`} key={item.id} className="search-result__item">
                <Film1 data={item}/>
            </div>
        });
    }

    calcHeight = (data) => {
        let height = 0;
        let domItem = document.querySelectorAll(".search-result__item");
        if (domItem.length > 0) {
            // console.log(domItem)
            Array.from(domItem).map(item =>
                height += item.clientHeight
            )
        }

        if (document.getElementById("spinner")) {
            height += document.getElementById("spinner").clientHeight;
        }
        if (document.getElementById("see-more-search")) {

            // height += 40; //padding
            height += document.getElementById("see-more-search").clientHeight;
        }

        this.setState({height});
    }

    // componentWillReceiveProps = (nextProps) =>{
    //     this.calcHeight(nextProps.data.film);
    // }

    componentDidMount = () => {
        this.calcHeight(this.props.data.data);
    }
    componentDidUpdate = () => {
        this.calcHeight(this.props.data.data);
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (this.preventUpdate === true) return false;
        return this.props.data !== nextProps.data || this.state.height !== nextState.height || this.props.isOpen !== nextProps.isOpen
    }

    constructor(props) {
        super(props);
        this.state = {
            height: 0,
        }

        // console.log('result',this.props.data)
    }

    renderLoadingAndSeeMore = () => {
        if (this.props.data.isLoading) {
            return (
                <Spinner className="search-result search-result__more"></Spinner>
            )
        }
        else {
            if (this.props.data.hasMore) {
                return (
                    <div id="see-more-search" key="search" className="search-result search-result__more">
                        <div onClick={this.props.onClickSeeMore}
                             className="section-user-info__btn section-user-info__btn--search">Xem
                            thêm <i
                                className="fa fa-caret-down"></i></div>
                    </div>
                )

            }
        }
    }

    render() {
        return (
            <div style={{height: (this.props.isOpen === false) ? 0 : this.state.height}} className="search-result"
                 ref="search">
                <ScrollBar>
                    {/*<FlipMove enterAnimation="fade" leaveAnimation="fade">*/}
                    {/*<div>*/}


                    {
                        this.renderItem()
                    }
                    {
                        this.renderLoadingAndSeeMore()
                    }

                    {/*</FlipMove>*/}

                </ScrollBar>
            </div>

        )
    }
}
export default(onClickOutside(SearchResult))