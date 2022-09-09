import { Injectable } from "@angular/core";
import { IMqttMessage, MqttService } from "ngx-mqtt";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ChatMqttService {
  // TODO 后期可以拼接名字，单聊
  private topicName = "chat/all";

  constructor(
    private _mqttService: MqttService
  ) {
  }

  topic(): Observable<IMqttMessage> {
    return this._mqttService.observe(this.topicName);
  }

  send(msg: string): Observable<void> {
    return this._mqttService.publish(this.topicName, msg);
  }
}
