import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { LanguageService } from "src/app/service/language.service";

@Component({
  selector: "app-submit-code",
  templateUrl: "./submit-code.component.html",
  styleUrls: ["./submit-code.component.scss"]
})
export class SubmitCodeComponent implements OnInit {
  language: string = "";
  code: string = "";
  @Input() submitting: boolean = false;
  @Output() submit = new EventEmitter<{ language: string; code: string }>();

  constructor(public languageService: LanguageService) {}

  ngOnInit() {}
  handleSubmit = () => {
    this.submit.emit({ code: this.code, language: this.language });
  };
}
