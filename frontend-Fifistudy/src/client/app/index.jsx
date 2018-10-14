import React from "react";
import {CookiesProvider} from "react-cookie";
import {Provider} from "react-redux";

import reducer from "./reducers/main";
import {applyMiddleware, createStore} from "redux";
import {render} from "react-dom";
import App from "./App";

import reduxThunk from "redux-thunk";
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <CookiesProvider>
            <App/>
        </CookiesProvider>
    </Provider>


    , document.getElementById('app'));
// registerServiceWorker();
