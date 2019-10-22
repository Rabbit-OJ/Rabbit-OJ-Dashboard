import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";

import { ProgressService } from "../service/progress.service";
import { tap, finalize } from "rxjs/operators";

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {
  constructor(private progressService: ProgressService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap(() => {
        this.progressService.startProgress();
      }),
      finalize(() => {
        this.progressService.stopProgress();
      })
    );
  }
}
