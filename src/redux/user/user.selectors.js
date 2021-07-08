import { createSelector } from "reselect";

export const userInputSelector = (state) => state.user;
export const userSelector = createSelector(
  [userInputSelector],
  (user) => user.currentUser
);
