import React from "react";
import {getActorIntro, getComment, getFilm, getFilmByDifficult, getReviewFilm} from "../actions/dataIntropage";
import {connect} from "react-redux";
import Loading from "../components/Loading";
import FilmIntro from "./FilmIntro";
import {withCookies} from "react-cookie";

class FilmIntroContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    initPage = (slug) => {
        let {cookies} = this.props;
        let token = cookies.get("token");
        // alert(token)

        // Token cho nay
        this.props.getFilm(slug, token);
        this.props.getActorIntro(slug);
        this.props.getComment(slug, token);
    }

    componentWillMount = () => {
        this.initPage(this.props.match.params.slug);
    }

    componentWillReceiveProps = (nextProps) => {
        let {cookies} = this.props;
        let token = cookies.get("token");
        // if (nextProps.film !== this.props.film) {
        //     if (_.has(nextProps.film, "data.data")) {
        //         this.props.getFilmByDifficult(nextProps.film.data.data.difficult_level);
        //         if (token) {
        //             this.props.getReviewFilm(nextProps.film.data.data.id, token);
        //         }
        //     }
        // }
        if (nextProps.match.params.slug !== this.props.match.params.slug) {
            this.initPage(nextProps.match.params.slug)
        }
        if (nextProps.isLogin !== this.props.isLogin) {
            if (nextProps.isLogin) {
                this.initPage(nextProps.match.params.slug);
            }
        }
    }

    render() {
        // console.log('dataa', this.props.film)
        if (this.props.film.isLoading) {
            return <Loading/>
        }
        else {
            if (this.props.film.data.errors == null) {
                return (
                    <FilmIntro data={this.props.film.data.data}/>
                )
            }
        }
        return <div style={{color: "white"}}>Loi</div>

    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.app.isLogin,
        film: state.dataIntropage.film
    }
}
export default connect(mapStateToProps, {
    getFilm,
    getActorIntro,
    getComment,
    getFilmByDifficult,
    getReviewFilm
})(withCookies(FilmIntroContainer))