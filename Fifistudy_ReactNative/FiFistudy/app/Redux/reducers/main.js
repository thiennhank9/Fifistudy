import {combineReducers} from 'redux';

import reducer from './Reducer';
import screenHome from './screenHome';
import screenMovie from './screenMovie';
import screenWatchMovie from './screenWatchMovie';
import screenList from './screenList';

const rootReducer = combineReducers({
    reducer,
    screenList,
    screenHome,
    screenMovie,
    screenWatchMovie
})

export default rootReducer