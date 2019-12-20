import { Component, OnInit } from "@angular/core";
import { Contest } from "src/app/interface/contest";
import { ContestClarify } from "src/app/interface/contest-clarify";
import { ContestMyInfo } from "src/app/interface/contest-my-info";

@Component({
  selector: "app-contest-dashboard",
  templateUrl: "./contest-dashboard.component.html",
  styleUrls: ["./contest-dashboard.component.scss"]
})
export class ContestDashboardComponent implements OnInit {
  contest: Contest = {
    name: "Contest Name",
    startTime: new Date(),
    blockTime: new Date(),
    endTime: new Date(),
    status: 0,
    participants: 0,
    penalty: 300
  };
  clarifyList: Array<ContestClarify> = [];
  myInfo: ContestMyInfo = {
    score: 0,
    rank: 0,
    completeTime: 0
  };
  constructor() {}

  ngOnInit() {}
}
