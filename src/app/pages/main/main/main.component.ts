import { Component, OnInit } from "@angular/core";
import { WindowManager } from "@tauri-apps/api/window";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {

  constructor() {
  }

  async open_login_window() {
    const handle = new WindowManager("login");
    try {
      const flag = await handle.isVisible();
      if (!flag) {
        await handle.show();
      }
    } catch (e) {
      console.log(e);
    }

  }

  ngOnInit(): void {
  }

}
