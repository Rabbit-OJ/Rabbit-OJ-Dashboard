import { Component, OnInit } from "@angular/core";
import { Submission } from "src/app/interface/submission";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap, map, takeUntil } from "rxjs/operators";
import { GeneralResponse } from "src/app/interface/general-response";
import { UrlService } from "src/app/service/url.service";
import { HttpClient } from "@angular/common/http";
import { WebSocketSubject } from "rxjs/webSocket";
import { HelperService } from "src/app/service/helper.service";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from 'rxjs';

@Component({
  selector: "app-submission-detail",
  templateUrl: "./submission-detail.component.html",
  styleUrls: ["./submission-detail.component.scss"]
})
export class SubmissionDetailComponent implements OnInit {
  item: Submission = {
    sid: 0,
    uid: 0,
    tid: 0,
    question_title: "",
    status: "AC",
    language: "php",
    time_used: 0,
    space_used: 0,
    created_at: new Date(),
    judge: []
  };
  code: string = "";
  private unsubscribe$: Subject<void>;

  constructor(private http: HttpClient, private route: ActivatedRoute, private snackBar: MatSnackBar) {}
  handleDownload = () => {
    const token = localStorage.getItem("token");
    const tempForm = document.createElement("form");
    tempForm.action = UrlService.SUBMISSION.POST_CODE(this.item.sid.toString());
    tempForm.target = "_blank";
    tempForm.method = "POST";
    tempForm.style.display = "none";

    const tokenElement = document.createElement("textarea");
    tokenElement.name = "token";
    tokenElement.value = token!;
    tempForm.appendChild(tokenElement);

    document.body.appendChild(tempForm);
    tempForm.submit();
    tempForm.remove();
  };
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngOnInit() {
    this.unsubscribe$ = new Subject<void>();
    setTimeout(() => {
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) =>
            this.http.get<GeneralResponse<Submission>>(UrlService.SUBMISSION.GET_DETAIL(params.get("sid"))).pipe(
              map(item => ({
                ...item.message,
                created_at: new Date(item.message.created_at),
                space_used: HelperService.displayMemory(item.message.space_used)
              }))
            )
          )
        )
        .subscribe(response => {
          this.item = response;
          if (this.item.status === "ING") {
            this.socketSubscribe();
          }
        });
    }, 0);
  }
  socketSubscribe = () => {
    const socket$ = new WebSocketSubject<{ ok: number }>(UrlService.SUBMISSION.SOCKET(this.item.sid.toString()));
    socket$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      ({ ok }) => {
        if (ok) {
          this.http
            .get<GeneralResponse<Submission>>(UrlService.SUBMISSION.GET_DETAIL(this.route.snapshot.params["sid"]))
            .pipe(
              map(item => ({
                ...item.message,
                created_at: new Date(item.message.created_at),
                space_used: HelperService.displayMemory(item.message.space_used)
              }))
            )
            .subscribe(response => (this.item = response));
        }
      },
      err => {
        console.error(err);
        this.snackBar.open("WebSocket已断开，可能无法实时更新评测结果！", "OK");
      }
    );
  };
  handleSelectedTabChange = (e: MatTabChangeEvent) => {
    if (e.index === 1 && this.code === "") {
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) =>
            this.http.post(
              UrlService.SUBMISSION.POST_CODE(params.get("sid")),
              `token=${localStorage.getItem("token")}`,
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                responseType: "text"
              }
            )
          )
        )
        .subscribe(response => {
          this.code = response;
        });
    }
  };
}
