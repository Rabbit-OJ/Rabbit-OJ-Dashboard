import { Component, OnInit } from "@angular/core";
import { Contest } from "src/app/interface/contest";
import { ContestClarify } from "src/app/interface/contest-clarify";
import { ContestMyInfo } from "src/app/interface/contest-my-info";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-contest-dashboard",
  templateUrl: "./contest-dashboard.component.html",
  styleUrls: ["./contest-dashboard.component.scss"]
})
export class ContestDashboardComponent implements OnInit {
  contest: Contest<string> = {
    name: "Contest Name",
    startTime: new Date().toLocaleString(),
    blockTime: new Date().toLocaleString(),
    endTime: new Date().toLocaleString(),
    status: 1,
    participants: 0,
    penalty: 300,
    count: 5,
    cid: "1",
    uid: "1"
  };
  scoreBoardList: Array<any> = [];
  scoreBoardDisplayedColumns: string[] = ["rank", "username", "score"];
  scoreBoardExtraColumns: string[] = [];
  scoreBoardCount: number = 0;
  clarifyList: Array<ContestClarify> = [];
  myInfo: ContestMyInfo = {
    score: 0,
    rank: 0,
    completeTime: 0
  };
  constructor() {}

  ngOnInit() {}
  renderScoreBoardQuestions = (count: number) => {
    const basicArr = ["rank", "username", "score"];
    const extraArr = [];
    for (let i = 1; i <= count; i++) {
      basicArr.push(`#${i}`);
      extraArr.push(`#${i}`);
    }
    this.scoreBoardDisplayedColumns = basicArr;
    this.scoreBoardExtraColumns = extraArr;
  };
  handleRegister = (status: "reg" | "cancel") => {};
  handlePageChange = (paginator: MatPaginator) => {
    console.log(paginator);
  };
}
