import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChatRoutingModule } from "./chat-routing.module";
import { ChatComponent } from "./chat.component";
import { MatDividerModule } from "@angular/material/divider";
import { MsgItemComponent } from './components/msg-item/msg-item.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatBadgeModule } from "@angular/material/badge";
import { LoadMoreComponent } from './components/load-more/load-more.component';

@NgModule({
  declarations: [ChatComponent, MsgItemComponent, InputFieldComponent, LoadMoreComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MatDividerModule,
    FormsModule,
    MatButtonModule,
    MatBadgeModule
  ]
})
export class ChatModule {
}
