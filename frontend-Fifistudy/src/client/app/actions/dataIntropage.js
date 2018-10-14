import * as Types from "../constants/dataIntropage";
import axios from "../config/axios";
import {API_PATH} from "../constants/apiPath";
import * as Api from "../actions/api";

export function getFilm(slug, token) {
    return function (dispatch) {
        dispatch({
            type: Types.GET_FILM,
            serverData: null,
            isLoading: true
        })
        // alert(token)
        Api.getFilm(slug, token).then(res => {
            dispatch({
                type: Types.GET_FILM,
                serverData: res,
                isLoading: false
            })
        })

        // axios.get(API_PATH.getFilm(slug))
        //     .then(response => {
        //         dispatch({
        //             type: Types.GET_FILM,
        //             serverData: response.data,
        //             isLoading: false
        //         })
        //
        //     })
        //     .catch(err => console.log(err));

    }
}


export function updateFilm(slug, token) {
    return function (dispatch) {
        // alert(token)
        Api.getFilm(slug, token).then(res => {
            dispatch({
                type: Types.GET_FILM,
                serverData: res,
                isLoading: false
            })
        })

        // axios.get(API_PATH.getFilm(slug))
        //     .then(response => {
        //         dispatch({
        //             type: Types.GET_FILM,
        //             serverData: response.data,
        //             isLoading: false
        //         })
        //
        //     })
        //     .catch(err => console.log(err));

    }
}


export function getActorIntro(slug) {
    return function (dispatch) {
        dispatch({
            type: Types.GET_ACTOR_INTRO,
            serverData: null,
            isLoading: true
        })
        axios.get(API_PATH.getActor(slug))
            .then(response => {
                dispatch({
                    type: Types.GET_ACTOR_INTRO,
                    serverData: response.data,
                    isLoading: false
                })

            })
            .catch(err => console.log(err));

    }
}

export function getComment(slug, token = null) {
    return function (dispatch) {
        // dispatch({
        //     type: Types.GET_COMMENT,
        //     serverData: null,
        //     isLoading: true
        // })
        if (token) {
            let config = {
                headers: {
                    "Authorization": `Token ${token}`
                }
            }
            axios.get(API_PATH.getCommentWithAuth(slug), config)
                .then(response => {
                    dispatch({
                        type: Types.GET_COMMENT,
                        serverData: response.data,
                        isLoading: false
                    })

                })
                .catch(err => console.log(err));
        }
        else {
            axios.get(API_PATH.getComment(slug))
                .then(response => {
                    dispatch({
                        type: Types.GET_COMMENT,
                        serverData: response.data,
                        isLoading: false
                    })

                })
                .catch(err => console.log(err));
        }


    }
}

export function getFilmByDifficult(difficultLevel) {
    return function (dispatch, getState) {
        // if (getState().dataIntropage.filmEqualDifficult.isLoading == true) {
        //     dispatch({
        //         type: Types.GET_FILM_BY_DIFFICULT,
        //         serverData: null,
        //         isLoading: true
        //     })
        // }


        axios.get(API_PATH.getFilmByDifficult(difficultLevel))
            .then(response => {
                dispatch({
                    type: Types.GET_FILM_BY_DIFFICULT,
                    serverData: response.data,
                    isLoading: false
                })

            })
            .catch(err => console.log(err));


    }
}

export function getReviewFilm(filmId, token) {
    return function (dispatch) {
        dispatch(loadingReviewed())
        Api.getReviewFilm(filmId, token).then(
            res => {
                dispatch({
                    type: Types.IS_REVIEWED,
                    serverData: res
                })
            }
        )
    }
}

export function loadingReviewed() {
    return function (dispatch) {
        dispatch({
            type: Types.LOADING_REVIEWD
        })

    }
}