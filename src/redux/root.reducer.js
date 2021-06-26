import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import evenementReducer from "./evenement/evenement.reducer";

export default combineReducers({
  user: userReducer,
  evenement: evenementReducer,
});
