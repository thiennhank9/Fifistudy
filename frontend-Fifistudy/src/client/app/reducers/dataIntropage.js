import * as Types from "../constants/dataIntropage";

const initialState = {
    film: {
        isLoading: true,
        data: null
    },
    actor: {
        isLoading: true,
        data: null

    },
    comment: {
        isLoading: true,
        data: null
    },
    filmEqualDifficult: {
        isLoading: true,
        data: null
    },
    isReviewed: null,
}

export default function dataHomepage(state = initialState, action) {
    switch (action.type) {
        case Types.GET_FILM:
            return Object.assign({}, state, {
                film: Object.assign({}, state.film, {
                    data: action.serverData,
                    isLoading: action.isLoading

                })
            });
            break;
        case Types.LOADING_REVIEWD:
            return Object.assign({}, state, {
                isReviewed: null
            });
            break;
        case Types.IS_REVIEWED:
            if (action.serverData.errors === null) {
                if (action.serverData.data === null) {
                    return Object.assign({}, state, {
                        isReviewed: 0
                    })
                }
                else {
                    return Object.assign({}, state, {
                        isReviewed: action.serverData.data.score
                    })
                }
            }
            return state;
            break;
        case Types.GET_ACTOR_INTRO:
            return Object.assign({}, state, {
                actor: Object.assign({}, state.actor, {
                    data: action.serverData,
                    isLoading: action.isLoading

                })
            });
            break;
        case Types.GET_COMMENT:
            return Object.assign({}, state, {
                comment: Object.assign({}, state.comment, {
                    data: action.serverData,
                    isLoading: action.isLoading

                })
            });
        case Types.GET_FILM_BY_DIFFICULT:
            return Object.assign({}, state, {
                filmEqualDifficult: Object.assign({}, state.filmEqualDifficult, {
                    data: action.serverData,
                    isLoading: action.isLoading

                })
            });
        default:
            return state
    }
}