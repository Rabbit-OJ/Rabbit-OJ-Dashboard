import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthenticationService } from "../service/authentication.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar, private authService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        console.error(err);
        if (err.status === 401) {
          this.authService.logout();
          location.reload(true);
        }

        const error = err.error.message || err.statusText || "Unknown Error";
        if (err.status !== 200) {
          this.snackBar.open(error, "OK", {
            duration: 2000
          });
        }
        return throwError(error);
      })
    );
  }
}
