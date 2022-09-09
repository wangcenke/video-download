import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./pages/login/login.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { httpInterceptorProviders } from "./interceptors";
import { StorageService } from "./serivces/storage.service";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from "@angular/material/snack-bar";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { authReducer } from "./store/auth/auth.reducer";
import { Store } from "@ngrx/store";
import { AppState } from "./store";
import { setToken, setUserInfo } from "./store/auth/auth.actions";
import { ChatModule } from "./pages/chat/chat.module";
import { IMqttServiceOptions, MqttModule } from "ngx-mqtt";
import { AuthService } from "./serivces/auth.service";

const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: environment.mqtt.server,
  port: environment.mqtt.port,
  protocol: (environment.mqtt.protocol === "ws") ? "ws" : "wss",
  path: "/mqtt"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChatModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    StoreModule.forRoot({
      auth: authReducer
    }, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [StorageService, httpInterceptorProviders, {
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: { duration: 3000, verticalPosition: "top" }
  }, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private local: StorageService,
    private authService: AuthService,
    private readonly store: Store<AppState>
  ) {
    const token = this.local.getToken();
    if (token !== "") {
      this.store.dispatch(setToken({ token: token }));
      this.authService.getUserinfo().subscribe(info => {
        if (info.code === 0 && info.data) {
          this.store.dispatch(setUserInfo({userinfo: info.data}))
          this.local.set("userinfo", info.data);
        }
      });
    }
  }
}
