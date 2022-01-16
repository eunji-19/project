import {combineReducers} from "redux";
import auth from "./auth";
import book from "./book";
import menuIndex from "./menuIndex";

const reducer = combineReducers({auth, menuIndex, book});

export default reducer;
