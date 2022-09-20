import { Component, ElementRef, OnInit } from "@angular/core";
import { Msg } from "../../types/msg";
import { IMqttMessage } from "ngx-mqtt";
import { ChatMqttService } from "../../serivces/chat.mqtt.service";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { selectUserinfo, AppState } from "../../store";
import { Userinfo } from "../../types/auth";
import { NotificationService } from "../../serivces/notification.service";
import { RecordService } from "../../serivces/record.service";


@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit {
  subscription: Subscription | undefined;
  msgList: Msg[] = [];
  userinfo: Userinfo | null;
  loadCount: number;

  constructor(
    private readonly chatMqtt: ChatMqttService,
    private readonly store: Store<AppState>,
    private notification: NotificationService,
    private el: ElementRef,
    private record: RecordService
  ) {
    this.userinfo = null;
    this.loadCount = 0;
  }


  private subscribeToTopic() {
    this.subscription = this.chatMqtt.topic().subscribe((data: IMqttMessage) => {
      const m: Msg = JSON.parse(data.payload.toString()) as unknown as Msg;
      let item: Msg = JSON.parse(data.payload.toString());
      if (item.user_id === this.userinfo?.id) {
        item.isSelf = true;
      } else {
        // 不是自己发送的数据不提示
        this.notification.notification(m.content, m.username).then();
      }
      this.msgList.push(item);
      this.record.writeRecord(data.payload.toString()).then();
      this.el.nativeElement.querySelector("#msg-list").scrollTop = 20000;
    });
  }

  scrollToBottom(): void {
    try {
      this.el.nativeElement.querySelector("#msg-list").scrollTop += this.el.nativeElement.querySelector("#msg-list").scrollHeight;
    } catch (e) {
      console.log(e);
    }
  }

  sendFn(val: string) {
    const msg: Msg = {
      user_id: this.userinfo?.id ?? 0,
      username: this.userinfo?.username ?? "无名",
      time: new Date(),
      content: val
    };
    this.chatMqtt.send(JSON.stringify(msg)).subscribe(res => {
      console.log(res);
    });
  }

  async loadRecord() {
    const res = await this.record.readRecord();
    this.msgList.unshift(...res);
    this.loadCount = res.length;
    // console.log(res);
    this.el.nativeElement.querySelector("#msg-list").scrollTop = 600;
  }

  ngAfterViewChecked(): void {
      this.scrollToBottom();
  }

  ngOnInit(): void {
    this.store.select(selectUserinfo).subscribe(info => {
      this.userinfo = info;
    });
    this.subscribeToTopic();
    this.scrollToBottom();
    this.record.init(this.chatMqtt.topicName).then(() => {
      // const current = this.time.getToday();
      this.loadRecord();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
