import * as Types from '../const/screenWatchMovie'
import update from 'react-addons-update';
const initialState = {
    episode: {
        isLoading: true,
        data: null
    }
}

export default screenWatchMovie = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_EPISODE:
            return update(state, {
                episode: {
                    $merge: {
                        isLoading: action.isLoading,
                        data: action.data
                    }
                }
            });
            break;
                        
        default :
            return state;
    }
}