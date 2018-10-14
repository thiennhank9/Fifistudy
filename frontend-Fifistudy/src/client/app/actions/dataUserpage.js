import * as Types from "../constants/dataUserpage";
import axios from "../config/axios";
import {API_PATH} from "../constants/apiPath";
import * as Api from "../actions/api";

export function getVocabulary(token) {
    return function (dispatch, getState) {
        // if (getState().dataUserpage.vocabulary == true) {
        //     dispatch({
        //         type: Types.GET_VOCABULARY,
        //         serverData: null,
        //         isLoading: true
        //     })
        // }
        // console.log(getState)

        let config = {
            headers: {
                "Authorization": `Token ${token}`
            }
        }
        axios.get(API_PATH.getVocabulary, config)
            .then(response => {
                dispatch({
                    type: Types.GET_VOCABULARY,
                    serverData: response.data,
                    isLoading: false
                })

            })
            .catch(err => console.log(err));


    }
}

export function getUserSaveFilm(token) {
    return function (dispatch) {
        // if (getState().dataUserpage.vocabulary == true) {
        //     dispatch({
        //         type: Types.GET_VOCABULARY,
        //         serverData: null,
        //         isLoading: true
        //     })
        // }
        // console.log(getState)
        Api.getUserSaveFilm(token).then(
            res => {
                dispatch({
                    type: Types.GET_SAVE_FILM,
                    serverData: res,
                    isLoading: false
                })
            }
        )

    }
}