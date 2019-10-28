import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LanguageResponse } from "../interface/language";
import { BehaviorSubject, Observable } from "rxjs";
import { GeneralResponse } from "../interface/general-response";
import { UrlService } from "./url.service";

@Injectable({
  providedIn: "root"
})
export class LanguageService {
  private languageSubject: BehaviorSubject<LanguageResponse>;
  public languageObservable: Observable<LanguageResponse>;
  constructor(private http: HttpClient) {
    this.languageSubject = new BehaviorSubject<LanguageResponse>([]);
    this.languageObservable = this.languageSubject.asObservable();
  }

  fetchLanguage() {
    this.http
      .get<GeneralResponse<LanguageResponse>>(UrlService.SUBMISSION.GET_LANGUAGE)
      .subscribe(({ code, message }) => {
        if (code === 200) {
          this.languageSubject.next(message);
        }
      });
  }
  public get data(): LanguageResponse {
    return this.languageSubject.value;
  }
}
