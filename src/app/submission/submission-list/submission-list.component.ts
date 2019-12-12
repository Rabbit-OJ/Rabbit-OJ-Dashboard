import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ISubmissionLite } from "src/app/interface/submission";
import { MatPaginator } from "@angular/material/paginator";
import { MemoryService } from "src/app/service/memory.service";

@Component({
  selector: "app-submission-list",
  templateUrl: "./submission-list.component.html",
  styleUrls: ["./submission-list.component.scss"]
})
export class SubmissionListComponent implements OnInit {
  displayedColumns: string[] = ["tid", "status", "performance", "created_at"];
  @Input() submissionList: Array<ISubmissionLite> = [];
  @Input() totalCount: number = 0;
  @Output() pageChange = new EventEmitter<MatPaginator>();

  constructor() {}

  ngOnInit() {}
  handlePageChange = (paginator: MatPaginator) => {
    this.pageChange.emit(paginator);
  };
  renderMemoryUsed = (input: number) => MemoryService.displayMemory(input);
}
