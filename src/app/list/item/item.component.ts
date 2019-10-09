import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { IListItem } from "src/app/ilist-item";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent implements OnInit {
  @Input() item: IListItem;

  constructor(private router: Router) {}

  ngOnInit() {}

  redirectDetail = () => {
    this.router.navigate(["info", this.item.id]);
  };
}
