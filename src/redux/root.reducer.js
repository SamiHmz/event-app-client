import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import evenementReducer from "./evenement/evenement.reducer";
import notificationsReducer from "./notifications/notifications.reducer";
import intervenantReducer from "./intervenant/intervenant.reducer";
import sponsoringReducer from "./sponsoring/sponsoring.reducer";
import bilanReducer from "./bilan/bilan.reducer";

export default combineReducers({
  user: userReducer,
  evenement: evenementReducer,
  notifications: notificationsReducer,
  intervenant: intervenantReducer,
  sponsoring: sponsoringReducer,
  bilan: bilanReducer,
});
