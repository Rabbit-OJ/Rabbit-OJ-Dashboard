import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProgressService {
  private progressSubject: BehaviorSubject<boolean>;
  public progress: Observable<boolean>;

  constructor() {
    this.progressSubject = new BehaviorSubject<boolean>(false);
    this.progress = this.progressSubject.asObservable();
  }

  public startProgress() {
    this.progressSubject.next(true);
  }

  public stopProgress() {
    this.progressSubject.next(false);
  }
}
