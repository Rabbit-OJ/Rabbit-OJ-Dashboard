import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UrlService } from "src/app/service/url.service";
import { GeneralResponse } from "src/app/interface/general-response";
import { LoginResponse } from "src/app/interface/login-response";
import { AuthenticationService } from "src/app/service/authentication.service";
import { PasswordService } from "src/app/service/password.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthenticationService, private router: Router) {}

  username = "";
  password = "";

  ngOnInit() {}

  handleLogin = () => {
    this.http
      .post<GeneralResponse<LoginResponse>>(UrlService.USER.POST_LOGIN, {
        username: this.username,
        password: PasswordService.MD5(this.password)
      })
      .subscribe(({ code, message }) => {
        if (code === 200) {
          this.authService.login(message.token, message);
          this.router.navigate(["/list", "1"]);
        }
      });
  };
}
