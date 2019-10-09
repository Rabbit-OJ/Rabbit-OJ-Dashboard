import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Rabbit-OJ-Dashboard";

  constructor(private router: Router) {}

  redirectList = () => {
    this.router.navigate(["list"]);
  };
  redirectRecord = () => {
    this.router.navigate(["record"]);
  };
}
