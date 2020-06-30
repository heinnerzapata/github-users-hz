import { combineReducers } from "redux";
import userReducer from "store/user/reducer";

const reducers = combineReducers({
  userReducer,
});

export default reducers;
