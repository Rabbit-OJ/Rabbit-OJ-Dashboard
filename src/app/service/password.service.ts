import { Injectable } from "@angular/core";
import { Md5 } from "ts-md5/dist/md5";

@Injectable({
  providedIn: "root"
})
export class PasswordService {
  constructor() {}

  static MD5 = (password: string) => Md5.hashStr(password);
}
