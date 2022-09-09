import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginForm, LoginRes, RegisterForm, RegisterRes, UserInfoRes } from "../types/auth";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  loginUrl = "/login";
  registerUrl = "/register";
  userinfo = "/userinfo";

  login(params: LoginForm) {
    return this.http.post<LoginRes>(this.loginUrl, params);
  }

  register(params: RegisterForm) {
    return this.http.post<RegisterRes>(this.registerUrl, params);
  }

  getUserinfo() {
    return this.http.get<UserInfoRes>(this.userinfo);
  }

}
