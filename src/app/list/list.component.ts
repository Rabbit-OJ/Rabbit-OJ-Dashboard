import { Component, OnInit } from "@angular/core";
import { QuestionListResponse, QuestionItem } from "../interface/question-list";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap, map } from "rxjs/operators";
import { UrlService } from "../service/url.service";
import { GeneralResponse } from "../interface/general-response";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  itemList: Array<QuestionItem> = [];
  totalCount: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) =>
            this.http
              .get<GeneralResponse<QuestionListResponse>>(UrlService.QUESTION.GET_LIST(params.get("page")))
              .pipe(map(item => item.message))
          )
        )
        .subscribe(response => {
          this.itemList = response.list;
          this.totalCount = response.count;
        });
    }, 0);
  }

  pageChange = (paginator: MatPaginator) => {
    this.router.navigate(["list", paginator.pageIndex + 1]);
  };
}
