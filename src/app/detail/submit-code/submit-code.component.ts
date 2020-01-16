import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { LanguageService } from "src/app/service/language.service";
import { Subject, interval } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-submit-code",
  templateUrl: "./submit-code.component.html",
  styleUrls: ["./submit-code.component.scss"]
})
export class SubmitCodeComponent implements OnInit {
  language: string = "";
  code: string = "";
  @Input() tid: string = "";
  @Input() submitting: boolean = false;
  @Output() submit = new EventEmitter<{ language: string; code: string }>();
  private unsubscribe$: Subject<void>;

  constructor(public languageService: LanguageService) {}
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngOnInit() {
    this.unsubscribe$ = new Subject<void>();

    if (localStorage.getItem(this.tid)) {
      this.code = localStorage.getItem(this.tid);
    }

    interval(30 * 1000)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        localStorage.setItem(this.tid, this.code);
      });
  }
  handleSubmit = () => {
    this.submit.emit({ code: this.code, language: this.language });
  };
}
