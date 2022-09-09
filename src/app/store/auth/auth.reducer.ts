import { createReducer, on } from "@ngrx/store";
import { setToken, setUserInfo, clearToken } from "./auth.actions";
import { Userinfo } from "../../types/auth";

export interface AuthState {
  token: string;
  isLogin: boolean;
  userinfo: Userinfo | null;
}

export const initialState: AuthState = {
  token: "",
  isLogin: false,
  userinfo: null
};

export const authReducer = createReducer(
  initialState,
  on(setToken, (state, { token }) => ({ ...state, token: token, isLogin: true })),
  on(setUserInfo, (state, { userinfo }) => ({ ...state, userinfo: userinfo })),
  on(clearToken, () => ({ token: "", isLogin: false, userinfo: null }))
);
