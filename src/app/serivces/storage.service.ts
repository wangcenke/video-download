import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StorageService {

  constructor() {
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any | null {
    const val = localStorage.getItem(key);
    if (!val) return null;
    return JSON.parse(val);
  }

  clear(): void {
    localStorage.clear();
  }

  setToken(token: string): void {
    localStorage.setItem("Authorization", token);
  }

  getToken(): string {
    const token = localStorage.getItem("Authorization");
    if (!token) return "";
    return token.toString();
  }
}
