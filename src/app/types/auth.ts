
export interface LoginForm {
  username: string;
  passwd: string;
}

export interface LoginRes {
  code: number;
  data?: LoginData;
  msg: string;
}

export interface LoginData {
  access_token: string;
  token_type: string;
}

export interface RegisterForm {
  username: string;
  passwd: string;
  checkPasswd: string;
}

export interface RegisterRes {
  id: number;
  username: string;
}

export interface Userinfo {
  id: number;
  username: string;
}

export interface UserInfoRes {
  code: number;
  data?: Userinfo;
  msg: string;
}
