import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  getReadings$ = new BehaviorSubject(null);

  constructor() {}
}
