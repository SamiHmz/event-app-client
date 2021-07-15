import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import evenementReducer from "./evenement/evenement.reducer";
import notificationsReducer from "./notifications/notifications.reducer";

export default combineReducers({
  user: userReducer,
  evenement: evenementReducer,
  notifications: notificationsReducer,
});
