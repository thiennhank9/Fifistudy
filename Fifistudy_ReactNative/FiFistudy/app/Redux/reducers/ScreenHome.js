import * as Types from '../const/screenHome'
import update from 'react-addons-update';
const initialState = {
    promotes: {
        isLoading: true,
        data: null
    },
    lastest: {
        isLoading: true,
        data: null
    },
    mostView: {
        isLoading: true,
        data: null
    }
}

export default screenHome = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_PROMOTE:
            return update(state, {
                promotes: {
                    $merge: {
                        isLoading: false,
                        data: action.data
                    }
                }
            });
            break;
        case Types.GET_LASTEST:
            return update(state, {
                lastest: {
                    $merge: {
                        isLoading: false,
                        data: action.data
                    }
                }
            });
            break;
        case Types.GET_MOST_VIEW:
            return update(state, {
                mostView: {
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