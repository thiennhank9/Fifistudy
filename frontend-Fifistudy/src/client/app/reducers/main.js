import {combineReducers} from "redux";
import app from "./app";
import dataHomepage from "./dataHomepage";
import dataIntropage from "./dataIntropage";
import dataDetailpage from "./dataDetailPage";
import dataUserpage from "./dataUserpage";
import dataListPage from "./dataListPage";

const rootReducer = combineReducers({
    app,
    dataHomepage,
    dataIntropage,
    dataDetailpage,
    dataUserpage,
    dataListPage
})

export default rootReducer
