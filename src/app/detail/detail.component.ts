import { Component, OnInit, Input } from "@angular/core";
import { QuestionDetail } from "../interface/question-detail";
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap, map } from "rxjs/operators";
import { GeneralResponse } from "../interface/general-response";

import marked from "marked";
import DOMPurify from "dompurify";
import { LanguageService } from "../service/language.service";

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
    created_at: ""
  };
  renderedHTML: string = "";
  language: string = "";
  code: string = "";

  constructor(private http: HttpClient, private route: ActivatedRoute, public languageService: LanguageService) {}

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
          this.renderedHTML = DOMPurify.sanitize(marked(content));
        });
    }, 0);
  }
  handleSubmit = () => {
    console.log({ language: this.language, code: this.code });
  };
}
