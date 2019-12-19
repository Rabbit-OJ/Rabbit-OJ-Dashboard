import { Component, OnInit } from "@angular/core";
import { QuestionDetail } from "../interface/question-detail";
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap, map } from "rxjs/operators";
import { GeneralResponse } from "../interface/general-response";

import marked from "marked";
import DOMPurify from "dompurify";

import { LanguageService } from "../service/language.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ISubmissionLite } from "../interface/submission";
import { AuthenticationService } from "../service/authentication.service";
import { MatPaginator } from "@angular/material/paginator";
import { SubmissionResponse } from "../interface/submission-response";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit {
  question: QuestionDetail = {
    tid: "",
    content: "",
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
  renderedHTML: string = "<p></p>";
  language: string = "";
  code: string = "";
  submissionList: Array<ISubmissionLite> = [];
  totalCount: number = 0;
  currentPage: number = 0;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public languageService: LanguageService,
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
          const { content } = response;

          const markdownRendered = marked(content);
          this.renderedHTML = DOMPurify.sanitize(markdownRendered);

          this.authService.currentUserObservable.subscribe(({ isLogin }) => {
            if (!isLogin) return;
            this.handleUpdateRecord("1");
          });
        });
    }, 0);
  }
  handleUpdateRecord = (page: string) => {
    this.http
      .get<GeneralResponse<SubmissionResponse>>(UrlService.QUESTION.RECORD(this.question.tid, page))
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

  handleSubmit = () => {
    if (this.language === "") {
      this.snackBar.open("Select a language first!", "OK", {
        duration: 2000
      });

      return;
    }

    this.http
      .post<GeneralResponse<string>>(UrlService.QUESTION.SUBMIT(this.question.tid), {
        language: this.language,
        code: this.code
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
}
