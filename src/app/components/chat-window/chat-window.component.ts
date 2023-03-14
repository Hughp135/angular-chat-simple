import { Component, Input, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ChannelId, MessageEnum, UserId } from 'src/generated/graphql';
import {
  faArrowUp,
  faArrowDown,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { ChannelsService } from 'src/app/services/channels.service';
import { ChatService } from 'src/app/services/chat.service';

type MessageEntry = MessageEnum & { error?: boolean };

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent {
  messages: MessageEntry[] = [];
  arrowUpIcon = faArrowUp;
  arrowDownIcon = faArrowDown;
  errorIcon = faCircleExclamation;
  loading = false;

  readMoreButtonClicked = new Subject<boolean>();

  constructor(
    public readonly channelsService: ChannelsService,
    public readonly chatService: ChatService
  ) {}

  ngOnInit() {
    this.chatService.messages.subscribe((value) => {
      console.log(value);
      this.messages = value;
    });
    this.readMoreButtonClicked.subscribe(async (old) => {
      this.chatService.fetchMore(old);
    });
  }
}
