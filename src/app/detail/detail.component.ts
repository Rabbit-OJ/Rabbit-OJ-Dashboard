import { Component, OnInit } from "@angular/core";
import { QuestionDetail } from "../interface/question-detail";
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap, map } from "rxjs/operators";
import { GeneralResponse } from "../interface/general-response";

import { MatSnackBar } from "@angular/material/snack-bar";
import { SubmissionLite } from "../interface/submission";
import { AuthenticationService } from "../service/authentication.service";
import { MatPaginator } from "@angular/material/paginator";
import { SubmissionResponse } from "../interface/submission-response";
import { MatTabChangeEvent } from "@angular/material/tabs";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit {
  question: QuestionDetail = {
    tid: 0,
    content: "<p></p>",
    subject: "",
    attempt: 0,
    accept: 0,
    difficulty: 0,
    time_limit: 0,
    space_limit: 0,
    created_at: "",
    sample: [],
    hide: false
  };
  submissionList: Array<SubmissionLite> = [];
  totalCount: number = 0;
  currentPage: number = 0;
  firstVisitSubmission: boolean = true;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) =>
            this.http.get<GeneralResponse<QuestionDetail>>(UrlService.QUESTION.OPTIONS_ITEM(params.get("tid"))).pipe(
              map(item => ({
                ...item.message,
                created_at: new Date(item.message.created_at as string).toLocaleString()
              }))
            )
          )
        )
        .subscribe(response => {
          this.question = response;
        });
    }, 0);
  }

  handleUpdateRecord = (page: string) => {
    this.http
      .get<GeneralResponse<SubmissionResponse>>(UrlService.QUESTION.GET_RECORD(this.question.tid.toString(), page))
      .subscribe(({ code, message }) => {
        if (code === 200) {
          this.totalCount = message.count;
          this.submissionList = message.list.map(item => ({
            ...item,
            created_at: new Date(item.created_at)
          }));
        }
      });
  };

  handleSubmit = ({ language, code }: { language: string; code: string }) => {
    if (language === "") {
      this.snackBar.open("Select a language first!", "OK", {
        duration: 2000
      });

      return;
    }

    this.http
      .post<GeneralResponse<string>>(UrlService.QUESTION.POST_SUBMIT(this.question.tid.toString()), {
        language: language,
        code: code
      })
      .subscribe(({ code, message }) => {
        if (code === 200) {
          this.router.navigate(["/submission", "detail", message]);
        }
      });
  };

  pageChange = (pagination: MatPaginator) => {
    this.handleUpdateRecord((pagination.pageIndex + 1).toString());
  };
  handleSelectedTabChange = (e: MatTabChangeEvent) => {
    if (e.index === 2 && this.firstVisitSubmission) {
      this.firstVisitSubmission = false;
      if (this.authService.currentUser.isLogin) {
        this.handleUpdateRecord("1");
      }
    }
  };
}
