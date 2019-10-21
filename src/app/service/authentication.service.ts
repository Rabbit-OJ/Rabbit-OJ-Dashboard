import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { MiniUser } from "../interface/mini-user";

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

  constructor() {
    this.currentUserSubject = new BehaviorSubject<MiniUser>(this.NOT_LOGIN_OBJ);
    this.currentUserObservable = this.currentUserSubject.asObservable();
  }

  public get currentUser(): MiniUser {
    return this.currentUserSubject.value;
  }

  public login(token: string, response: MiniUser) {
    localStorage.setItem("token", token);
    this.currentUserSubject.next(response);
  }

  public logout() {
    localStorage.removeItem("token");
    this.currentUserSubject.next(this.NOT_LOGIN_OBJ);
  }
}
