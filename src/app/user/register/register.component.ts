import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GeneralResponse } from "src/app/interface/general-response";
import { LoginResponse } from "src/app/interface/login-response";
import { UrlService } from "src/app/service/url.service";
import { PasswordService } from "src/app/service/password.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {}

  username = "";
  password = "";
  password_repeat = "";
  email = "";

  ngOnInit() {}

  handleRegister = () => {
    if (this.password !== this.password_repeat) {
      this.snackBar.open("Password NOT Consistent!", "OK", {
        duration: 2000
      });

      return;
    }

    this.http
      .post<GeneralResponse<LoginResponse>>(UrlService.USER.POST_REGISTER, {
        username: this.username,
        password: PasswordService.MD5(this.password),
        email: this.email
      })
      .subscribe(({ code }) => {
        if (code === 200) {
          this.snackBar.open("Register Success!", "OK", {
            duration: 2000
          });

          this.router.navigate(["/user", "login"]);
        }
      });
  };
}
