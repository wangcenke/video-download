import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntypedFormBuilder, UntypedFormControl, Validators } from "@angular/forms";
import { AuthService } from "../../serivces/auth.service";
import { Store } from "@ngrx/store";
import { setToken, setUserInfo } from "../../store/auth/auth.actions";
import { AppState } from "../../store";
import { StorageService } from "../../serivces/storage.service";
import { Userinfo } from "../../types/auth";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly store: Store<AppState>,
    private local: StorageService
  ) {
  }

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
              this.store.dispatch(setUserInfo({userinfo: info.data}))
              this.local.set("userinfo", info.data);
              this.router.navigate(["/chat"]).then();
            }
          });

        }
      });
    }
  }

  getErrorMessage() {
    return this.checkoutForm.get("email")?.hasError("email") ? "请输入正确的邮箱" : "";
  }

  ngOnInit(): void {
    console.log(this.route.title);
  }

}
