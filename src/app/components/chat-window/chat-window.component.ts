import { Component } from '@angular/core';
import {
  faArrowUp,
  faArrowDown,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { ChannelsService } from 'src/app/services/channels.service';
import { ChatService, MessageEntry } from 'src/app/services/chat.service';

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
