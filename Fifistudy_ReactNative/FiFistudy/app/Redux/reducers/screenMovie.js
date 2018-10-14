import * as Types from '../const/screenMovie'
import update from 'react-addons-update';
const initialState = {
    film: {
        isLoading: true,
        data: null
    }
}

export default screenMovie = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_FILM:
            return update(state, {
                film: {
                    $merge: {
                        isLoading: false,
                        data: action.data
                    }
                }
            });
            break;
        default :
            return state;
    }
}