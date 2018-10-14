import * as Types from "../constants/dataHomepage";
import * as TypesApp from "../constants/app";
import update from "react-addons-update";
import {makeNewDataSaveFilm} from "../actions/help";

const initialState = {
    promotes: null,
    mostView: null,
    mostLastest: null,
}

export default function dataHomepage(state = initialState, action) {
    switch (action.type) {
        case TypesApp.UPDATE_SAVED_HOME:
            let newStateMostView = state.mostView;
            if (newStateMostView) {
                let newDataMostView = makeNewDataSaveFilm(action.filmId, state.mostView.data);

                newStateMostView = update(state.mostView, {$merge: {data: newDataMostView}})
            }

            let newStateLastest = state.mostLastest;
            if (newStateLastest) {
                let newDataLastest = makeNewDataSaveFilm(action.filmId, state.mostLastest.data);
                newStateLastest = update(state.mostView, {$merge: {data: newDataLastest}})
            }
            return Object.assign({}, state, {
                mostView: newStateMostView,
                mostLastest: newStateLastest
            })
        case Types.GET_PROMOTE:
            return Object.assign({}, state, {
                promotes: action.serverData
            })
        case Types.GET_MOST_VIEW:
            return Object.assign({}, state, {
                mostView: action.serverData
            })
        case Types.GET_LATEST:
            return Object.assign({}, state, {
                mostLastest: action.serverData
            });
        // case Types.UPDATE_HOMEPAGE_SAVED_FILM:
        //     console.log(!!action.film_id)
        //     let filmNeedUpdate = state.mostLastest.data.findIndex(o => o.id == action.film_id);
        //     let newLastest = update(state.mostLastest.data, {
        //         $splice: [[filmNeedUpdate, 1, update(state.mostLastest.data[filmNeedUpdate], {$merge: {is_saved: !!action.film_id}})]]
        //     })
        //     return Object.assign({}, state, Object.assign({},state.mostLastest,{data:newLastest}))
        default:
            return state
    }
}