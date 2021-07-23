import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import evenementReducer from "./evenement/evenement.reducer";
import notificationsReducer from "./notifications/notifications.reducer";
import intervenantReducer from "./intervenant/intervenant.reducer";

export default combineReducers({
  user: userReducer,
  evenement: evenementReducer,
  notifications: notificationsReducer,
  intervenant: intervenantReducer,
});
