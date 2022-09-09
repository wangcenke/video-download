import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-input-field",
  templateUrl: "./input-field.component.html",
  styleUrls: ["./input-field.component.scss"]
})
export class InputFieldComponent implements OnInit {
  @Output() send = new EventEmitter<string>();

  constructor() {
  }

  _value = "";

  sendMsg($event: any) {
    if (this._value.trim() !== "") {
      this.send.emit(this._value);
    }
      this._value = "";
  }

  breakLine($event: any) {
    this._value = `${this._value}\n`;
  }

  ngOnInit(): void {
  }

}
