import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router) {}

  username = "";
  password = "";
  password_repeat = "";
  email = "";

  ngOnInit() {}

  handleRegister = () => {};

  redirectLogin = () => {
    this.router.navigate(["user", "login"]);
  };
}
