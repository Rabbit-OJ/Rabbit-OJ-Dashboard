import { Component, OnInit } from "@angular/core";
import { Contest } from "src/app/interface/contest";
import { ContestClarify } from "src/app/interface/contest-clarify";
import { ContestMyInfo } from "src/app/interface/contest-my-info";
import { MatPaginator } from "@angular/material/paginator";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { switchMap, map } from "rxjs/operators";
import { GeneralResponse } from "src/app/interface/general-response";
import { UrlService } from "src/app/service/url.service";
import { ScoreBoard } from "src/app/interface/score-board";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-contest-dashboard",
  templateUrl: "./contest-dashboard.component.html",
  styleUrls: ["./contest-dashboard.component.scss"]
})
export class ContestDashboardComponent implements OnInit {
  contest: Contest<string> = {
    name: "Contest Name",
    start_time: new Date().toLocaleString(),
    block_time: new Date().toLocaleString(),
    end_time: new Date().toLocaleString(),
    status: 1,
    participants: 0,
    penalty: 300,
    count: 5,
    cid: "1",
    uid: "1"
  };
  scoreBoardList: Array<ScoreBoard> = [];
  scoreBoardDisplayedColumns: string[] = ["rank", "username", "score"];
  scoreBoardExtraColumns: string[] = [];
  scoreBoardCount: number = 0;
  clarifyList: Array<ContestClarify> = [];
  myInfo: ContestMyInfo = {
    score: 0,
    rank: 0,
    total_time: 0
  };
  scoreBoardPage: number = 1;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) =>
            this.http
              .get<GeneralResponse<Contest>>(UrlService.CONTEST.GET_INFO(params.get("cid")))
              .pipe(map(item => item.message))
          )
        )
        .subscribe(response => {
          this.contest = {
            ...response,
            start_time: new Date(response.start_time).toLocaleString(),
            end_time: new Date(response.end_time).toLocaleString(),
            block_time: new Date(response.block_time).toLocaleString()
          };

          if (this.contest.status > 0) {
            this.fetchMyInfo();
            this.fetchScoreBoard();
          }

          this.renderScoreBoardQuestions(response.count);
          this.scoreBoardCount = response.participants;
        });
    }, 0);
  }
  fetchMyInfo = () => {
    this.http
      .get<GeneralResponse<ContestMyInfo>>(UrlService.CONTEST.GET_MY_INFO(this.route.snapshot.paramMap.get("cid")))
      .pipe(map(item => item.message))
      .subscribe(response => {
        this.myInfo = response;
      });
  };
  fetchScoreBoard = () => {
    this.http
      .get<GeneralResponse<Array<ScoreBoard>>>(
        UrlService.CONTEST.GET_SCORE_BOARD(this.route.snapshot.paramMap.get("cid"), this.scoreBoardPage.toString())
      )
      .pipe(map(item => item.message))
      .subscribe(response => {
        this.scoreBoardList = response;
      });
  };
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
  handleRegister = (status: "reg" | "cancel") => {
    this.http
      .post<GeneralResponse<string>>(
        UrlService.CONTEST.POST_REGISTER(this.route.snapshot.paramMap.get("cid"), status),
        {}
      )
      .subscribe(response => {
        if (response.code === 200) {
          this.snackBar.open("操作成功！", "OK", {
            duration: 2000
          });
        } else {
          this.snackBar.open(response.message, "OK", {
            duration: 2000
          });
        }
      });
  };
  handlePageChange = (paginator: MatPaginator) => {
    this.scoreBoardPage = paginator.pageIndex + 1;
    this.fetchScoreBoard();
  };
}
