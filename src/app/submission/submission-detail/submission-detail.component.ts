import { Component, OnInit, Input } from "@angular/core";
import { ISubmission } from "src/app/interface/submission";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap, map } from "rxjs/operators";
import { GeneralResponse } from "src/app/interface/general-response";
import { UrlService } from "src/app/service/url.service";
import { HttpClient } from "@angular/common/http";
import { WebSocketSubject } from "rxjs/webSocket";

@Component({
  selector: "app-submission-detail",
  templateUrl: "./submission-detail.component.html",
  styleUrls: ["./submission-detail.component.scss"]
})
export class SubmissionDetailComponent implements OnInit {
  item: ISubmission = {
    sid: "",
    uid: "",
    tid: "",
    question_title: "",
    status: "AC",
    language: "php",
    time_used: 0,
    space_used: 0,
    created_at: new Date(),
    judge: []
  };

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}
  handleDownload = () => {
    window.open(UrlService.SUBMISSION.GET_CODE(this.item.sid));
  };
  ngOnInit() {
    setTimeout(() => {
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) =>
            this.http
              .get<GeneralResponse<ISubmission>>(UrlService.SUBMISSION.GET_DETAIL(params.get("sid")))
              .pipe(map(item => ({ ...item.message, created_at: new Date(item.message.created_at) })))
          )
        )
        .subscribe(response => {
          this.item = response;
          if (this.item.status === "ING") {
            const socket$ = new WebSocketSubject<{ ok: number }>(UrlService.SUBMISSION.SOCKET(this.item.sid));
            socket$.subscribe(({ ok }) => {
              if (ok) {
                this.http
                  .get<GeneralResponse<ISubmission>>(
                    UrlService.SUBMISSION.GET_DETAIL(this.route.snapshot.params["sid"])
                  )
                  .pipe(map(item => ({ ...item.message, created_at: new Date(item.message.created_at) })))
                  .subscribe(response => (this.item = response));
              }
            });
          }
        });
    }, 0);
  }
}
