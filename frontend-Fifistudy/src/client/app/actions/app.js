import * as Types from "../constants/app";
import * as Api from "../actions/api";
import {MAX_PAGE} from "../constants/apiPath";


export const getUserInfo = (token) => {
    return function (dispatch) {
        Api.getUserInfo(token).then(res => {
            if (res.data.errors === null) {
                dispatch({
                    type: Types.GET_USER_INFO,
                    serverData: res
                })
                dispatch(doLogin(true));
            }
            else {
                dispatch(doLogin(false));

            }
        })
    }

}

export const toggleModalLogin = () => {
    return function (dispatch) {
        dispatch({
            type: Types.TOGGLE_MODAL_LOGIN
        })
    }

}

export const doLogin = (isLogin) => {
    return function (dispatch) {
        dispatch({
            type: Types.DO_LOGIN,
            isLogin
        })
    }

}

export const getSearch = (searchKey, orderBy, pageNumber, pageSize = MAX_PAGE, token = null) => {
    return function (dispatch) {
        dispatch(loadingSearch());
        Api.getSearch(searchKey, orderBy, pageNumber, pageSize, token).then(res => {
            dispatch({
                type: Types.GET_SEARCH,
                serverData: res
            })

        })
    }

}

export const resetSearch = () => {
    return function (dispatch) {
        dispatch({
            type: Types.RESET_SEARCH
        })
    }
}

export const loadingSearch = () => {
    return function (dispatch) {
        dispatch({
            type: Types.LOADING_SEARCH
        })
    }
}


export const updateSaved = (filmId) => {
    // debugger
    // Vao reducer phai check null truoc, ham make thi chac chan oldData phai la mang
    return function (dispatch) {
        dispatch({
            type: Types.UPDATE_SAVED_HOME,
            filmId
        })
        dispatch({
            type: Types.UPDATE_SAVED_LIST,
            filmId
        })
    }
}

export const unSavedFilm = (filmId) => {
    return function (dispatch) {
        dispatch({
            type: Types.UPDATE_SAVED_USER,
            filmId
        })
    }
}

