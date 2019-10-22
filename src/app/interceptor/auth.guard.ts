import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../service/authentication.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) {}
  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { isLogin } = this.authService.currentUser;
    if (isLogin) {
      return true;
    } else {
      this.router.navigate(["/user", "login"], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
