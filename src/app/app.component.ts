import { Component, Input } from "@angular/core";
import { ProgressService } from "./service/progress.service";
import { AuthenticationService } from "./service/authentication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Rabbit OJ Dashboard";
  @Input() progressShow: boolean = false;

  constructor(public progressService: ProgressService, public authService: AuthenticationService) {}

  ngOnInit() {
    setTimeout(() => {
      this.progressService.progress.subscribe(item => (this.progressShow = item));
      if (localStorage.getItem("token") !== undefined) {
        this.authService.checkTokenValid();
      }
    }, 0);
  }
}
