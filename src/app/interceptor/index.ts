import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { AuthInterceptor } from "./auth.interceptor";
import { ErrorInterceptor } from "./error.interceptor";
import { ProgressInterceptor } from "./progress.interceptor";

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true }
];
