import * as Types from "../constants/dataDetailPage";
import axios from "../config/axios";
import {API_PATH} from "../constants/apiPath";

export function getEpisode(filmSlug, episodeId) {
    return function (dispatch) {
        axios.get(API_PATH.getEpisode(filmSlug, episodeId))
            .then(response => {
                dispatch({
                    type: Types.GET_EPISODE,
                    serverData: response.data
                })

            })
            .catch(err => console.log(err));

    }
}

export function getFilmDetail(slug) {
    return function (dispatch) {
        axios.get(API_PATH.getFilm(slug))
            .then(response => {
                dispatch({
                    type: Types.GET_FILM_DETAIL,
                    serverData: response.data
                })

            })
            .catch(err => console.log(err));

    }
}


export function getDataDetailPage(filmSlug, episodeId) {

    return function (dispatch) {
        // dispatch({
        //     type: Types.GET_DATTA_DETAIL_PAGE,
        //     serverData: null,
        //     isLoading: true
        // })
        Promise.all([axios.get(API_PATH.getEpisode(filmSlug, episodeId))
            .then(response => {
                return response.data

            })
            .catch(err => console.log(err)), axios.get(API_PATH.getFilm(filmSlug))
            .then(response => {
                return response.data

            })
            .catch(err => console.log(err))]).then(values => {
            dispatch({
                type: Types.GET_DATTA_DETAIL_PAGE,
                serverData: {
                    episode: values[0],
                    film: values[1]
                },
                isLoading: false
            })
        });

    }
}
