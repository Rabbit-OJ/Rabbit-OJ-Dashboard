import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit {
  @Input() id: string = "1";
  @Input() title: string = "A + B Problem";
  @Input() description: string = "Output A + B";
  @Input() acCount: number = 1;
  @Input() attemptCount: number = 6;

  constructor() {}

  ngOnInit() {}
}
