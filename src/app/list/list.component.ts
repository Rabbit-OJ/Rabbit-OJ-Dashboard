import { Component, OnInit, Input } from "@angular/core";
import { QuestionList } from "../interface/question-list";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap, map } from "rxjs/operators";
import { UrlService } from "../service/url.service";
import { GeneralResponse } from "../interface/general-response";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  @Input() itemList: QuestionList;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.http
            .get<GeneralResponse<QuestionList>>(UrlService.QUESTION.GET_LIST(params.get("page")))
            .pipe(map(item => item.message))
        )
      )
      .subscribe(response => {
        this.itemList = response;
      });
  }
}
