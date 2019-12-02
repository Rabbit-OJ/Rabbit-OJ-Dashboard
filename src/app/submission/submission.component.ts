import { Component, OnInit } from "@angular/core";
import { ISubmissionLite } from "../interface/submission";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap, map } from "rxjs/operators";
import { GeneralResponse } from "../interface/general-response";
import { UrlService } from "../service/url.service";
import { HttpClient } from "@angular/common/http";
import { SubmissionResponse } from "../interface/submission-response";
import { MatPaginator } from "@angular/material/paginator";

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
  totalCount: number = 0;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) => {
            return this.http
              .get<GeneralResponse<SubmissionResponse>>(
                UrlService.SUBMISSION.GET_USER_LIST(
                  params.get("uid"),
                  params.get("page")
                )
              )
              .pipe(
                map(item => ({
                  count: item.message.count,
                  list: item.message.list.map(item => ({
                    ...item,
                    created_at: new Date(item.created_at)
                  }))
                }))
              );
          })
        )
        .subscribe(response => {
          this.submissionList = response.list;
          this.totalCount = response.count;
        });
    }, 0);
  }
  pageChange = (paginator: MatPaginator) => {
    this.router.navigate([
      "submission",
      "list",
      this.route.snapshot.params["uid"],
      paginator.pageIndex + 1
    ]);
  };
}
