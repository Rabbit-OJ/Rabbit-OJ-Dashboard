import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { MiniUser, LoginResponseUser } from "../interface/mini-user";
import { HttpClient } from "@angular/common/http";
import { GeneralResponse } from "../interface/general-response";
import { UrlService } from "./url.service";
import { LoginResponse } from "../interface/login-response";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<MiniUser>;
  private NOT_LOGIN_OBJ = {
    isLogin: false,
    username: "",
    uid: "",
    isAdmin: false
  };
  public currentUserObservable: Observable<MiniUser>;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.currentUserSubject = new BehaviorSubject<MiniUser>(this.NOT_LOGIN_OBJ);
    this.currentUserObservable = this.currentUserSubject.asObservable();
  }

  public get currentUser(): MiniUser {
    return this.currentUserSubject.value;
  }

  public checkTokenValid() {
    const token = localStorage.getItem("token") || "";
    if (token === "") {
      return;
    }
    
    this.http
      .get<GeneralResponse<LoginResponse>>(UrlService.USER.GET_TOKEN, {
        headers: {
          Authorization: token
        }
      })
      .subscribe(({ code, message }) => {
        if (code === 200) {
          this.login(message.token, message);
        }
      });
  }

  public login(token: string, response: LoginResponseUser) {
    localStorage.setItem("token", token);
    this.currentUserSubject.next({ ...response, isLogin: true });
    this.snackBar.open(`欢迎回来，${response.username}！`, "OK", {
      duration: 2000
    });
  }

  public logout() {
    localStorage.removeItem("token");
    this.currentUserSubject.next(this.NOT_LOGIN_OBJ);
  }
}
