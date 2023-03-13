import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ChannelId, MessageEnum, UserId } from 'src/generated/graphql';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent {
  messages: MessageEnum[] = [];
  hasMoreMessages = true;
  arrowUp = faArrowUp;
  private channelSubscription?: Subscription;
  loading = true;

  @Input() selectedChannel!: ChannelId;
  @Input() selectedUser!: UserId;

  @ViewChild('container') chatContainer!: ElementRef;

  constructor(private readonly apiService: ApiService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedChannel']) {
      if (this.channelSubscription) {
        this.channelSubscription.unsubscribe();
      }
      this.loading = true;
      this.hasMoreMessages = true;
      this.channelSubscription = this.apiService
        .fetchLatest(this.selectedChannel)
        .subscribe((data) => {
          this.messages = data;
          this.loading = false;
        });
    }
  }

  fetchMore() {
    const lastMessage = this.messages[this.messages.length - 1];

    if (!lastMessage) {
      throw new Error('No messages have been loaded yet');
    }

    this.apiService
      .fetchMore(this.selectedChannel, lastMessage.messageId)
      .subscribe((data) => {
        if (data.length < 10) {
          this.hasMoreMessages = false;
        }

        if (data.length) {
          this.messages = [...this.messages, ...data];
          console.log(this.messages);
          setTimeout(() => {
            console.log(this.chatContainer.nativeElement);
            this.chatContainer.nativeElement.scrollTop =
              -this.chatContainer.nativeElement.scrollHeight;
          });
        }
      });
  }
}
