import * as Types from "../constants/dataListPage";
import {MAX_PAGE_LIST} from "../constants/apiPath";
import * as Api from "../actions/api";

export const getListPage = (orderBy, pageNumber, pageSize = MAX_PAGE_LIST, token = null) => {
    // debugger
    return function (dispatch) {
        dispatch(loadingListFilm());
        // alert(token)
        Api.getSearch("", orderBy, pageNumber, pageSize, token).then(res => {
            dispatch({
                type: Types.GET_LIST_FILM,
                serverData: res
            })

        })
    }

}

export const loadingListFilm = () => {
    return function (dispatch) {
        dispatch({
            type: Types.LOADING_LIST_FILM
        })
    }
}


export const deleteListFilm = () => {
    return function (dispatch) {
        dispatch({
            type: Types.DELETE_LIST_FILM
        })
    }
}


export const resetListFilm = (orderBy, pageNumber, pageSize = MAX_PAGE_LIST, token = null) => {
    // debugger
    return function (dispatch) {
        dispatch(loadingListFilm());
        Api.getSearch("", orderBy, pageNumber, pageSize, token).then(res => {
            dispatch({
                type: Types.RESET_LIST_FILM,
                serverData: res
            })

        })
    }

}