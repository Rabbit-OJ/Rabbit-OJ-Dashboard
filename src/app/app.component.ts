import { Component, Input } from "@angular/core";
import { ProgressService } from "./service/progress.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Rabbit OJ Dashboard";
  @Input() progressShow: boolean = false;

  constructor(public progressService: ProgressService) {}

  ngOnInit() {
    setTimeout(() => this.progressService.progress.subscribe(item => (this.progressShow = item)), 0);
  }
}
