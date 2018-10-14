import React from "react";
import Loading from "../components/Loading";
import Detail from "./Detail";
import {connect} from "react-redux";
import {getComment} from "../actions/dataIntropage";
import {getDataDetailPage, getEpisode, getFilmDetail} from "../actions/dataDetailpage";
import {withCookies} from "react-cookie";

class DetailContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount = () => {
        let {slug, episodeId} = this.props.match.params;
        let {cookies} = this.props;
        let token = cookies.get("token");
        this.props.getComment(slug, token);
        this.getData(slug, episodeId);
        // this.props.getDataDetailPage(filmSlug, episodeId);
        // this.props.getEpisode(this.props.match.params.filmSlug, this.props.match.params.episodeId);
        // this.props.getFilmDetail(this.props.match.params.filmSlug);
    }

    getData = (filmSlug, episodeId) => {
        this.props.getDataDetailPage(filmSlug, episodeId);
    }


    componentWillReceiveProps = (nextProps) => {
        if (nextProps.match.params.slug !== this.props.match.params.slug || nextProps.match.params.episodeId !== this.props.match.params.episodeId) {
            let {slug, episodeId} = nextProps.match.params;
            this.getData(slug, episodeId);
        }
    }

    render() {
        // console.log(this.props.data, 'dataaa');
        // if (this.props.episode && this.props.filmDetail) {
        //     if (this.props.episode.errors == null && this.props.filmDetail.errors == null) {
        //         if (this.props.episode.data && this.props.filmDetail.data) {
        //             return (
        //                 <Detail episode={this.props.episode.data} filmDetail={this.props.filmDetail.data}/>
        //             )
        //         }
        //     }
        // }
        // return null
        if (this.props.data.isLoading) {
            return <Loading/>
        }
        else {

            if (this.props.data.serverData) {
                let {episode, film} = this.props.data.serverData;
                if (episode.errors == null && film.errors == null) {
                    if (episode.data && film.data) {
                        return (
                            <Detail episode={episode.data} filmDetail={film.data}/>
                        )
                    }
                }
            }
        }
        return <div style={{color: "white"}}>Loi</div>

    }
}

const mapStateToProps = state => {
    return {
        data: state.dataDetailpage.localData,
        // filmDetail: state.dataDetailpage.filmDetail
    }
}
export default  connect(mapStateToProps, {
    getEpisode,
    getFilmDetail,
    getComment,
    getDataDetailPage
})(withCookies(DetailContainer))