import { Component, Input } from "@angular/core";
import { ProgressService } from "./service/progress.service";
import { AuthenticationService } from "./service/authentication.service";
import { LanguageService } from "./service/language.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Rabbit OJ Dashboard";
  progressShow: boolean = false;

  constructor(
    public progressService: ProgressService,
    public authService: AuthenticationService,
    public languageService: LanguageService,
    public router: Router
  ) {}

  handleSubmissionList = () => {
    this.router.navigate(["/submission", "list", this.authService.currentUser.uid, "1"]);
  };

  ngOnInit() {
    setTimeout(() => {
      this.progressService.progress.subscribe(item => (this.progressShow = item));
      this.languageService.fetchLanguage();
      if (localStorage.getItem("token") !== undefined) {
        this.authService.checkTokenValid();
      }
    }, 0);
  }
}
