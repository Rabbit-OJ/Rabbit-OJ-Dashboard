import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class MemoryService {
  static displayMemory = (input: number): string => {
    if (input <= 1024) {
      return `${input.toFixed(2)}KB`;
    } else {
      return `${(input / 1024.0).toFixed(2)}MB`;
    }
  };
  constructor() {}
}
