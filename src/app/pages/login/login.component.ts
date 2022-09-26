import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntypedFormBuilder, UntypedFormControl, Validators } from "@angular/forms";
import { AuthService } from "../../serivces/auth.service";
import { Store } from "@ngrx/store";
import { setToken, setUserInfo } from "../../store/auth/auth.actions";
import { AppState } from "../../store";
import { StorageService } from "../../serivces/storage.service";
import { WindowManager } from "@tauri-apps/api/window";
import { appWindow } from "@tauri-apps/api/window";
import { UnlistenFn } from "@tauri-apps/api/event";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [AuthService]
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly store: Store<AppState>,
    private local: StorageService
  ) {
    this.unListen = null;
  }

  unListen: UnlistenFn | null;
  hide = true;

  checkoutForm = this.formBuilder.group({
    username: new UntypedFormControl("", [Validators.required]),
    // email: new FormControl("", [Validators.required, Validators.email]),
    passwd: new UntypedFormControl("", [Validators.required])
  });

  onSubmit(): void {
    // console.log(this.checkoutForm.valid);
    // console.log(this.checkoutForm.value);
    if (this.checkoutForm.valid) {
      this.authService.login(this.checkoutForm.value).subscribe(res => {
        if (res.code === 0 && res.data) {
          this.store.dispatch(setToken({ token: res.data.access_token }));
          this.local.setToken(res.data.access_token);
          this.authService.getUserinfo().subscribe(info => {
            if (info.code === 0 && info.data) {
              this.store.dispatch(setUserInfo({ userinfo: info.data }));
              this.local.set("userinfo", info.data);
              this.close_login_window();
              // this.router.navigate(["/chat"]).then();
            }
          });
        }
      });
    }
  }

  async close_login_window_listen() {
    const handle = new WindowManager("login");
    this.unListen = await appWindow.onCloseRequested(async (event) => {
      event.preventDefault();
      handle.hide().then();
    });
  }

  close_login_window() {
    const handle = new WindowManager("login");
    handle.hide().then();
  }

  getErrorMessage() {
    return this.checkoutForm.get("email")?.hasError("email") ? "请输入正确的邮箱" : "";
  }

  ngOnInit(): void {
    this.close_login_window_listen().then();
    console.log(this.route.title);
  }

  ngOnDestroy(): void {
    this.unListen?.();
  }

}
