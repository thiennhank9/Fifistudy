import * as Types from "../constants/dataUserpage";
import * as TypesApp from "../constants/app";
import update from "react-addons-update";

const initialState = {
    vocabulary: {
        isLoading: true,
        data: null
    },
    savedFilm: {
        isLoading: true,
        data: null
    }
}

export default function dataHomepage(state = initialState, action) {
    switch (action.type) {
        case TypesApp.UPDATE_SAVED_USER:
            if (state.savedFilm.data) {
                if (state.savedFilm.data.data) {
                    if (Array.isArray(state.savedFilm.data.data)) {
                        let {data} = state.savedFilm.data;
                        let findIndex = data.findIndex(o => o.film_id == action.filmId);
                        if (findIndex > -1) {
                            let newData = update(data, {$splice: [[findIndex, 1]]});
                            let newStateSavedFilm = update(state.savedFilm, {data: {$merge: {data: newData}}});
                            return Object.assign({}, state, {savedFilm: newStateSavedFilm})
                        }
                    }
                }
            }
            return state;

        // let newData = makeNewDataSaveFilm(action.filmId, state.savedFilm.data);
        // let newDataSavedFilm = update(state.savedFilm, {$merge: {data: newData}})
        // return Object.assign({}, state, {
        //     savedFilm: newDataSavedFilm
        // });

        case Types.GET_VOCABULARY:
            return Object.assign({}, state, {
                vocabulary: Object.assign({}, state.vocabulary, {
                    data: action.serverData,
                    isLoading: action.isLoading

                })
            });
        case Types.GET_SAVE_FILM:
            return Object.assign({}, state, {
                savedFilm: Object.assign({}, state.savedFilm, {
                    data: action.serverData,
                    isLoading: action.isLoading

                })
            });
            break;
        default:
            return state
    }
}