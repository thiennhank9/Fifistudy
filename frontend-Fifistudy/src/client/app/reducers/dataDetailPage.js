import * as Types from "../constants/dataDetailPage";

const initialState = {
    // episode: null,
    // filmDetail: null
    localData: {
        isLoading: true,
        serverData: null
    }
}

export default function dataDetailpage(state = initialState, action) {
    switch (action.type) {
        // case Types.GET_EPISODE:
        //     return Object.assign({}, state, {
        //         episode: action.serverData
        //     })
        // case Types.GET_FILM_DETAIL:
        //     return Object.assign({}, state, {
        //         filmDetail: action.serverData
        //     })
        case Types.GET_DATTA_DETAIL_PAGE:
            return Object.assign({}, state, {
                localData: Object.assign({}, state.localData, {
                    serverData: action.serverData,
                    isLoading: action.isLoading

                })
            });

        default:
            return state
    }
}