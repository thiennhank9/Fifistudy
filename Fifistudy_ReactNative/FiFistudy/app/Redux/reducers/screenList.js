import * as Types from "../const/screenList";
import update from "react-addons-update";
const initialState = {
    filmsByDifficultLevel: {
        isLoading: true,
        data: null
    },
    search: {
        isLoading: true,
        data: null
    }
}

export default screenList = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_FILM_BY_DIFFICULT_LEVEL:
            return update(state, {
                filmsByDifficultLevel: {
                    $set: {
                        isLoading: action.isLoading,
                        data: action.data
                    }
                }
            });
            break;

        case Types.GET_SEARCH:
            return update(state, {
                search: {
                    $set: {
                        isLoading: action.isLoading,
                        data: action.data
                    }
                }
            });
            break;
        case Types.RESET_FILM_BY_DIFFICULT_LEVEL:
            return update(state, {
                filmsByDifficultLevel: {
                    $set: initialState.filmsByDifficultLevel
                }
            });
            break;
        default :
            return state;
    }
}