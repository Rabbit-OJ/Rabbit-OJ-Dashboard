import { Component, OnInit } from "@angular/core";
import { Contest } from "src/app/interface/contest";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { switchMap, map } from "rxjs/operators";
import { GeneralResponse } from "src/app/interface/general-response";
import { GeneralListResponse } from "src/app/interface/question-list";
import { UrlService } from "src/app/service/url.service";

@Component({
  selector: "app-contest-list",
  templateUrl: "./contest-list.component.html",
  styleUrls: ["./contest-list.component.scss"]
})
export class ContestListComponent implements OnInit {
  itemList: Array<Contest> = [];
  totalCount: number = 0;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  renderStatus = (status: 0 | 1 | 2) => {
    if (status === 0) {
      return "未开始";
    } else if (status === 1) {
      return "进行中";
    } else {
      return "已结束";
    }
  };
  ngOnInit() {
    setTimeout(() => {
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) =>
            this.http
              .get<GeneralResponse<GeneralListResponse<Contest>>>(UrlService.CONTEST.GET_LIST(params.get("page")))
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
    this.router.navigate(["contest", "list", paginator.pageIndex + 1]);
  };
}
