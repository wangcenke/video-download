import { Injectable } from '@angular/core';
import * as dayjs from "dayjs";

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() {
    this.state = "";
  }

  private state = ""

  getToday(){
    const current = dayjs().format("YYYYMMDD");
    this.state = current;
    return current;
  }

  getPreviousDay() {
    const prev = dayjs(this.state).subtract(1, "day").format("YYYYMMDD");
    this.state = prev;
    return prev;
  }

}
