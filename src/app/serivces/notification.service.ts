import { Injectable } from "@angular/core";
import { isPermissionGranted, requestPermission, sendNotification } from "@tauri-apps/api/notification";

@Injectable({
  providedIn: "root"
})
export class NotificationService {

  constructor() {
  }

  async notification_bank(body: string, title = "消息") {
    if (Notification.permission === "default" || Notification.permission === "granted") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        new Notification(title, {
          body: body
        });
      }
    }
  }

  async notification(body: string, title = "消息") {

    let permissionGranted = await isPermissionGranted();
    // console.log("permissionGranted", permissionGranted);
    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === "granted";
    }
    // console.log("permissionGranted", permissionGranted);

    if (permissionGranted) {
      console.log(body);
      sendNotification({ title: title, body: body });
      // new Notification(title, {
      //   body: body
      // });
    }
  }

}
