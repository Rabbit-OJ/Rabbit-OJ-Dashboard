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
import { QuestionJudge } from "../interface/question-judge";

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
  questionJudge: QuestionJudge = {
    mode: "CMP",
    dataset_count: 1,
    version: 1
  };
  submissionList: Array<SubmissionLite> = [];
  totalCount: number = 0;
  currentPage: number = 0;
  firstVisitSubmission: boolean = true;
  judge_activated: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public authService: AuthenticationService
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
          this.fetchQuestionJudgeInfo();
        });
    }, 0);
  }
  fetchQuestionJudgeInfo = () => {
    if (!this.authService.currentUser.isAdmin) return;
    const { tid } = this.question;

    this.http
      .get<GeneralResponse<QuestionJudge>>(UrlService.QUESTION.OPTIONS_JUDGE(tid.toString()))
      .pipe(
        map(item => ({
          ...item.message
        }))
      )
      .subscribe(
        response => {
          this.questionJudge = response;
          this.judge_activated = true;
        },
        err => {
          console.error(err);
          this.judge_activated = false;
        }
      );
  };
  handleUpdateRecord = (page: string) => {
    this.http.get<GeneralResponse<SubmissionResponse>>(UrlService.QUESTION.GET_RECORD(this.question.tid.toString(), page)).subscribe(({ code, message }) => {
      if (code === 200) {
        this.totalCount = message.count;
        this.submissionList = message.list.map(item => ({
          ...item,
          created_at: new Date(item.created_at)
        }));
      }
    });
  };

  codeSubmitting: boolean = false;
  handleSubmit = ({ language, code }: { language: string; code: string }) => {
    if (language === "") {
      this.snackBar.open("Select a language first!", "OK", {
        duration: 2000
      });

      return;
    }

    this.codeSubmitting = true;
    this.http
      .post<GeneralResponse<string>>(UrlService.QUESTION.POST_SUBMIT(this.question.tid.toString()), {
        language: language,
        code: code
      })
      .subscribe(
        ({ code, message }) => {
          if (code === 200) {
            this.router.navigate(["/submission", "detail", message]);
          }
          this.codeSubmitting = false;
        },
        err => {
          console.error(err);
          this.codeSubmitting = false;
        }
      );
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
  handleSubmitEdit = () => {
    this.http
      .put<GeneralResponse<string>>(UrlService.QUESTION.PUT_EDIT(this.question.tid.toString()), {
        ...this.question
      })
      .subscribe(
        () => {
          this.snackBar.open("修改成功！", "OK", {
            duration: 2000
          });
        },
        err => {
          console.error(err);
          this.snackBar.open("修改失败！", "OK", {
            duration: 2000
          });
        }
      );
  };
  handleAddSample = () => {
    this.question.sample.push({ in: "", out: "" });
  };
  handleDeleteSample = (id: number) => {
    this.question.sample = this.question.sample.filter((_, index) => index !== id);
  };
  handleSubmitQuestionJudge = () => {
    this.http
      .post<GeneralResponse<string>>(UrlService.QUESTION.OPTIONS_JUDGE(this.question.tid.toString()), {
        ...this.questionJudge
      })
      .subscribe(
        () => {
          this.snackBar.open("修改成功！", "OK", {
            duration: 2000
          });
        },
        err => {
          console.error(err);
          this.snackBar.open("修改失败！", "OK", {
            duration: 2000
          });
        }
      );
  };
}
