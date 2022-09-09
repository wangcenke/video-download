import { createAction, props } from "@ngrx/store";
import {Userinfo} from "../../types/auth";

export const setToken = createAction("[Auth] setToken", props<{ token: string }>());
export const setUserInfo = createAction("[Auth] setUserInfo", props<{ userinfo: Userinfo }>());
export const clearToken = createAction("[Auth] clearToken");
