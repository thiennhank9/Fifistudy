import { createStore,applyMiddleware} from 'redux';
import reducer from './reducers/main.js';
import reduxThunk from 'redux-thunk';

import devToolsEnhancer from 'remote-redux-devtools';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducer,devToolsEnhancer());

export default store;