import { createSelector } from "@ngrx/store";
import { AuthState } from "./auth/auth.reducer";

export interface AppState {
  auth: AuthState;
}

export const selectAuth = (state: AppState) => state.auth;

export const selectAuthToken = createSelector(
  selectAuth,
  (state) => state.token
);

export const selectIsLogin = createSelector(
  selectAuth,
  (state) => state.isLogin
);

export const selectUserinfo = createSelector(
  selectAuth,
  (state) => state.userinfo
);
