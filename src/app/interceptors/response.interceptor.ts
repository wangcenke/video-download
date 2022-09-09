import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          if (event.body.code !== 0) {
            this._snackBar.open(event.body.msg, "关闭");
          }
        }
      }),
      catchError((err: HttpErrorResponse) => {

          if (err.status === 401) {
            this.router.navigate(["/login"]).then();
            this._snackBar.open("登录过期", "关闭");
          } else {
            this._snackBar.open(err.statusText, "关闭");
          }
          return throwError(() => err);
        }
      )
    );
  }
}
