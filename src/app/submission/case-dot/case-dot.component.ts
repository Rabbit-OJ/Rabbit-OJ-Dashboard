import { Component, OnInit, Input } from "@angular/core";
import { IJudgeResult } from "src/app/interface/submission";

@Component({
  selector: "app-case-dot",
  templateUrl: "./case-dot.component.html",
  styleUrls: ["./case-dot.component.scss"]
})
export class CaseDotComponent implements OnInit {
  @Input() dot: IJudgeResult;
  @Input() key: number;
  constructor() {}
  ngOnInit() {}
}
