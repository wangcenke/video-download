import { Component, Input, OnInit } from "@angular/core";
import {Msg} from "../../../../types/msg";

@Component({
  selector: "app-msg-item",
  templateUrl: "./msg-item.component.html",
  styleUrls: ["./msg-item.component.scss"]
})
export class MsgItemComponent implements OnInit {
  @Input() msg!: Msg;

  constructor() {
  }

  ngOnInit(): void {
  }

}
