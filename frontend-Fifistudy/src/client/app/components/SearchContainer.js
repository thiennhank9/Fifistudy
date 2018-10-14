import React from "react";
import {getSearch, loadingSearch, resetSearch} from "../actions/app";
import {connect} from "react-redux";
import {ORDER_BY} from "../constants/apiPath";
import SearchResult from "./SearchResult";
let timeout = null;
class SearchContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            isOpen: false
        };
    }

    openSearchContainer = () => {
        this.setState({
            isOpen: true
        })
    }


    onClickSeeMore = () => {
        this.props.getSearch(this.state.searchValue, ORDER_BY.createdAtIncrease, this.props.searchResult.nextPage, 5)
    }

    renderSearchResult = () => {
        // debugger
        // if (this.props.searchResult) {
        //     if (this.props.searchResult.errors == null) {
        //         if (this.props.searchResult.data) {
        return (
            <SearchResult onClickSeeMore={this.onClickSeeMore} closeSearchContainer={this.closeSearchContainer}
                          isOpen={this.state.isOpen}
                          outsideClickIgnoreClass="header__item--search"
                          data={this.props.searchResult}/>
        )
        //         }
        //     }
        // }
        // return null
    }

    onTextSearchChange = e => {
        // debugger
        this.props.resetSearch();
        if (!e.target.value) {
            return
        }

        this.setState({
            [e.target.name]: e.target.value
        })

        if (timeout) {
            clearTimeout(timeout);
        }
        let value = e.target.value;
        timeout = setTimeout(() => {
            this.props.getSearch(value, ORDER_BY.createdAtIncrease, 1, 5)
        }, 500)

    }

    closeSearchContainer = () => {
        this.setState({
            isOpen: false
        })
    }

    render() {
        return (
            <div className={"header__item header__item--search " + this.props.classNameContainer}>
                <div style={{position: "relative"}}>
                    <input className={"header__search " + this.props.classNameInput} onClick={this.openSearchContainer}
                           name="searchValue" onChange={this.onTextSearchChange}
                           type="text"
                           placeholder="search"/>
                    {
                        this.renderSearchResult()
                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchResult: state.app.searchResult,
        isLogin: state.app.isLogin
    }
}

SearchContainer.defaultProps = {
    classNameContainer: "header__item header__item--search",
    classNameInput: "header__search"
}

export default connect(mapStateToProps, {getSearch, resetSearch, loadingSearch})(SearchContainer)