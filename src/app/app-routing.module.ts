import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./pages/login/login.component";

export const routes: Routes = [
  { path: "", redirectTo: "/main", pathMatch: "full" },
  { title: "登录", path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
