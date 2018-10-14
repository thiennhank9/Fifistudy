import * as Types from "../constants/dataListPage";
import * as TypesApp from "../constants/app";
import update from "react-addons-update";
import {makeNewDataSaveFilm} from "../actions/help";
const initialState = {
    dataListPage: {
        hasMore: false,
        nextPage: 1,
        data: [],
        isLoading: false
    }
}

export default function index(state = initialState, action) {

    switch (action.type) {
        case TypesApp.UPDATE_SAVED_LIST:
            // debugger
            let newData = makeNewDataSaveFilm(action.filmId, state.dataListPage.data);
            let newDataListPage = update(state.dataListPage, {$merge: {data: newData}});
            return Object.assign({}, state, {
                dataListPage: newDataListPage
            })

        case Types.RESET_LIST_FILM:
            if (action.serverData.errors === null) {
                return Object.assign({}, state, {
                    dataListPage: {
                        hasMore: action.serverData.data.has_more,
                        nextPage: 2,
                        data: action.serverData.data.films,
                        isLoading: false
                    }
                })
            }
            return state;

        case Types.LOADING_LIST_FILM:
            let newSearchResult = update(state.dataListPage, {$merge: {isLoading: true, hasMore: false}})
            return Object.assign({}, state, {dataListPage: newSearchResult})
        case Types.DELETE_LIST_FILM:
            // let newSearchResult = update(state.dataListPage, {$merge: {isLoading: true, hasMore: false}})
            return Object.assign({}, state, {dataListPage: initialState.dataListPage})
        case Types.GET_LIST_FILM:
            if (action.serverData.errors === null) {
                return Object.assign({}, state, {
                    dataListPage: {
                        hasMore: action.serverData.data.has_more,
                        nextPage: state.dataListPage.nextPage + 1,
                        data: [...state.dataListPage.data.concat(action.serverData.data.films)],
                        isLoading: false
                    }
                })
            }
            return state;

        default:
            return state
    }
}