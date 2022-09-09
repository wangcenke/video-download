import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar) {
  }

  // TODO 401返回登录页
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
        this._snackBar.open(err.statusText, "关闭");
          return throwError(() => err);
        }
      )
    );
  }
}
