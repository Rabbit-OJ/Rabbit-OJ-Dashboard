import { Component, OnInit, Input } from "@angular/core";
import { IListItem } from "../ilist-item";
import { Router } from "@angular/router";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  @Input() itemList: Array<IListItem> = [
    {
      id: "1",
      name: "A + B Problem",
      acCount: 12,
      attemptCount: 24,
      difficulty: 1
    },
    {
      id: "2",
      name: "A Medium Problem",
      acCount: 12,
      attemptCount: 24,
      difficulty: 2
    },
    {
      id: "3",
      name: "[2019 Fall] 面试时间选择",
      acCount: 0,
      attemptCount: 24,
      difficulty: 3
    }
  ];
  constructor(private router: Router) {}
  ngOnInit() {}

  redirectDetail = (id: string) => {
    this.router.navigate(["info", id]);
  };
}
