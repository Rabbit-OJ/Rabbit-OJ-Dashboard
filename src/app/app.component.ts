import { Component, Input } from "@angular/core";
import { ProgressService } from "./service/progress.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Rabbit OJ Dashboard";

  @Input() progress: boolean = false;

  constructor(public progressService: ProgressService) {}

  ngOnInit() {
    this.progressService.progress.subscribe(item => {
      this.progress = item;
      console.log(this.progress);
    });
  }
}
