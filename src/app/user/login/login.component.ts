import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  username = "";
  password = "";

  ngOnInit() {}

  handleLogin = () => {
    console.log(this.username, this.password);
  };

  redirectRegister = () => {
    this.router.navigate(["user", "register"]);
  };
}
