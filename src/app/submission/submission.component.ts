import { Component, OnInit, Input } from "@angular/core";
import { ISubmissionLite } from "../interface/submission";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap, map, mergeAll } from "rxjs/operators";
import { GeneralResponse } from "../interface/general-response";
import { UrlService } from "../service/url.service";
import { AuthenticationService } from "../service/authentication.service";
import { HttpClient } from "@angular/common/http";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: "app-submission",
  templateUrl: "./submission.component.html",
  styleUrls: ["./submission.component.scss"]
})
export class SubmissionComponent implements OnInit {
  displayedColumns: string[] = ["tid", "status", "performance", "created_at"];
  submissionList: Array<ISubmissionLite> = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    setTimeout(() => {
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) => {
            return this.http
              .get<GeneralResponse<Array<ISubmissionLite>>>(
                UrlService.SUBMISSION.GET_USER_LIST(params.get("uid"), params.get("page"))
              )
              .pipe(map(item => item.message.map(item => ({ ...item, created_at: new Date(item.created_at) }))));
          })
        )
        .subscribe(response => {
          this.submissionList = response;
        });
    }, 0);
  }
}
