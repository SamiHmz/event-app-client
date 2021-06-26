import { createSelector } from "reselect";

const userInputSelector = (state) => state.user;
export const userSelector = createSelector(
  [userInputSelector],
  (user) => user.currentUser
);
