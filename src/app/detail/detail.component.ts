import { Component, OnInit, Input } from "@angular/core";
import { QuestionDetail } from "../interface/question-detail";
import { HttpClient } from "@angular/common/http";
import { UrlService } from "../service/url.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap, map } from "rxjs/operators";
import { GeneralResponse } from "../interface/general-response";

import marked from "marked";
import DOMPurify from "dompurify";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit {
  @Input() question: QuestionDetail;
  @Input() renderedHTML: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.http
            .get<GeneralResponse<QuestionDetail>>(UrlService.QUESTION.OPTIONS_ITEM(params.get("tid")))
            .pipe(map(item => item.message))
        )
      )
      .subscribe(response => {
        this.question = response;
        const { content } = response;
        this.renderedHTML = DOMPurify.sanitize(marked(content));
      });
  }
}
