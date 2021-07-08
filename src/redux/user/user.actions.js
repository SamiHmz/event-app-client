import userActions from "./user.actions.types";
export const loginStart = (payload) => ({
  type: userActions.LOGIN_START,
  payload,
});

export const setCurrentUser = (user, token) => ({
  type: userActions.SET_CURRENT_USER,
  payload: {
    user,
    token,
  },
});
